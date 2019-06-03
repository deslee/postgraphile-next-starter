import {MigrationInterface, QueryRunner} from "typeorm";
import globalConfig from "../../globalConfig";

const tables = ['user', 'post', 'asset']

export class Authentication1559445858050 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE EXTENSION "uuid-ossp"`);
        await queryRunner.query(`CREATE EXTENSION "pgcrypto"`);

        await queryRunner.query(`
        CREATE FUNCTION app_public.register(email text, password text, data JSON) returns app_public.user AS $$
        DECLARE publicUser app_public.user;
        DECLARE privateUser app_private.private_user;

        BEGIN
            INSERT INTO app_public.User (email, data) VALUES (email, data)
            RETURNING * into publicUser;

            INSERT INTO app_private.private_user (password, "userId") VALUES
            (crypt(password, gen_salt('bf')), publicUser.id)
            RETURNING * into privateUser;

            RETURN publicUser;
        end;
        $$ language plpgsql STRICT SECURITY DEFINER;
        `);

        await queryRunner.query(`
        CREATE FUNCTION app_public.update_password(user_id int, new_password text) returns app_public.user AS $$
        DECLARE publicUser app_public.user;

        BEGIN
            IF user_id::text IS DISTINCT FROM current_setting('claims.userId', true)::text THEN
            RAISE EXCEPTION 'unauthorized';
            end if;

            UPDATE app_private.private_user SET password=crypt(new_password, gen_salt('bf')) WHERE "userId"=user_id;

            SELECT * into publicUser FROM app_public.User WHERE id=user_id;

            return publicUser;
        end;
        $$ language plpgsql STRICT SECURITY DEFINER;
        `);

        await queryRunner.query(`
        CREATE FUNCTION app_hidden.create_session(
        email text,
        password text,
        sessionData json,
        expirationDate timestamp
        ) returns app_private.session as $$
        declare userPrivate app_private.private_user;
        declare "session" app_private.session;

        BEGIN

            SELECT PRIVATE.* INTO userPrivate
            FROM app_private.private_user as PRIVATE
            INNER JOIN app_public."user" "PUBLIC"
            ON PRIVATE."userId" = "PUBLIC".id
            WHERE "PUBLIC".email=create_session.email
            AND PRIVATE.password=crypt(create_session.password, PRIVATE.password);

        if userPrivate is null then
            return null;
        end if;

        INSERT INTO app_private.session(token, "userId", "invalidAfter", "data") VALUES
        (uuid_generate_v4(), userPrivate."userId", expirationDate, sessionData) RETURNING * into "session";

        return "session";
        end;
        $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
        `);
        
        await queryRunner.query(`
        CREATE FUNCTION app_private.clear_expired_sessions() RETURNS void as $$
        BEGIN
            DELETE FROM app_private.session S WHERE S."invalidAfter" < NOW();
        end;
        $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
        `);

        await queryRunner.query(`CREATE FUNCTION app_public.me() RETURNS app_public."user" as $$
        SELECT * FROM app_public."user"
        WHERE id::text = current_setting('claims.userId', true)::text
        $$ language sql stable;`)

        await queryRunner.query(`
        CREATE VIEW app_private.active_sessions AS
        SELECT * FROM app_private.session S
        WHERE S."invalidAfter" > NOW();
        `)

        await queryRunner.query(`GRANT EXECUTE ON FUNCTION app_public.register(text, text, json) TO ${globalConfig.db.regularUser.name}`)
        await queryRunner.query(`GRANT EXECUTE ON FUNCTION app_public.update_password(int, text) TO ${globalConfig.db.regularUser.name}`)
        
        await queryRunner.query(`
        CREATE FUNCTION app_hidden.logout() RETURNS VOID AS $$
          BEGIN
          DELETE FROM app_private.session WHERE token=current_setting('claims.sessionId', true)::text AND "userId"::text=current_setting('claims.userId', true)::text;
          END
        $$ language plpgsql STRICT SECURITY DEFINER`)
        
                await queryRunner.query(`
        CREATE FUNCTION app_hidden.logout_all() RETURNS VOID AS $$
          BEGIN
          DELETE FROM app_private.session WHERE "userId"::text=current_setting('claims.userId', true)::text;
          END
        $$ language plpgsql STRICT SECURITY DEFINER
        `);

        for(const table of tables) {
            await queryRunner.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "app_public"."${table}" TO ${globalConfig.db.regularUser.name}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        for(const table of tables) {
            await queryRunner.query(`REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE "app_public"."${table}" FROM ${globalConfig.db.regularUser.name}`);
        }
        await queryRunner.query(`DROP VIEW app_private.active_sessions`);
        await queryRunner.query(`DROP FUNCTION app_public.me()`);
        await queryRunner.query(`DROP FUNCTION app_private.clear_expired_sessions()`);
        await queryRunner.query(`DROP FUNCTION app_hidden.create_session(email text, password text, sessionData json, expirationDate timestamp)`);
        await queryRunner.query(`DROP FUNCTION app_public.update_password(user_id integer, new_password text)`);
        await queryRunner.query(`DROP FUNCTION app_public.register(email text, password text, data JSON)`);
        await queryRunner.query(`DROP EXTENSION "pgcrypto"`);
        await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
        await queryRunner.query(`DROP FUNCTION app_hidden.logout()`)
        await queryRunner.query(`DROP FUNCTION app_hidden.logout_all()`)
    }
}
