import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn, ManyToMany } from "typeorm";
import globalConfig from "../../globalConfig";
import { Auditable } from "./Auditable";
import { Post } from "./Post";

@Entity({
    schema: "app_public"
})
export class Asset implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Index()
    state: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column({nullable: true})
    uri: string;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}