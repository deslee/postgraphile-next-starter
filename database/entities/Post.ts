import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import globalConfig from "../../globalConfig";
import { Auditable } from "./Auditable";

@Entity({
    schema: "app_public"
})
export class Post implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    @Index()
    type: string;

    @Column({nullable: true})
    @Index()
    date: Date;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}