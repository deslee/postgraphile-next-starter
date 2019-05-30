import { Binding, RegisterInput } from "server/embeddedGraphql/bindings";
import config from "../globalConfig";
import { UserInputError } from "apollo-server-core";

export default (binding: Binding) => ({
    ['register']: async ({ input: register }: { input: RegisterInput }) => {
        const user = await binding.query.userByEmail({ email: register.email }, undefined, { context: { pgSettings: { role: config.db.adminUser.name } } });
        if (user) {
            throw new UserInputError("Email already exists");
        }
    }
})