import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity({
    schema: 'app_private'
})
export class Session {
    @PrimaryColumn()
    token: string;

    @ManyToOne(_ => User, { nullable: false, eager: true })
    @JoinColumn({name: 'userId'})
    @Index()
    user: User;

    @Column()
    @Index()
    invalidAfter: Date;

    @Column()
    data: string;
}