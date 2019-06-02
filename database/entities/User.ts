import { Auditable } from "./Auditable";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index, ManyToMany } from "typeorm";
import globalConfig from "../../globalConfig";

@Entity({
    schema: "app_public"
})
export class User implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}

@Entity({
    schema: 'app_private'
})
export class PrivateUser implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    password: string;

    @OneToOne(_ => User, { eager: true })
    @Index()
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}