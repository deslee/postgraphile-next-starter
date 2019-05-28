import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn, ManyToMany } from "typeorm";
import config from "../../globalConfig";
import { Auditable } from "./Auditable";
import { Site } from "./Site";
import { Post } from "./Post";

@Entity({
    schema: config.db.schema
})
export class Asset implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(_ => Site, site => site.assets, { nullable: false })
    @Index()
    @JoinColumn({ name: 'siteId' })
    site: Site;

    @Column()
    state: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @ManyToMany(_ => Post, post => post.assets)
    posts: Post[];

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}