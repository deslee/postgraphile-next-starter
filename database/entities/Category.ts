import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn, ManyToMany } from "typeorm";
import config from "../../globalConfig";
import { Auditable } from "./Auditable";
import { Site } from "./Site";
import { Post } from "./Post";

@Entity({
    schema: config.db.schema
})
@Unique(['site', 'name'])
@Index(['site', 'name'], { unique: true })
export class Category implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(_ => Site, site => site.categories, { nullable: false })
    @Index()
    @JoinColumn({ name: 'siteId' })
    site: Site;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column()
    name: string;

    @ManyToMany(_ => Post, post => post.categories)
    posts: Post[]

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}