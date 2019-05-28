import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Index, Unique, ManyToMany, JoinTable } from "typeorm";
import config from "../../globalConfig";
import { Auditable } from "./Auditable";
import { Site } from "./Site";
import { Category } from "./Category";
import { Asset } from "./Asset";

@Entity({
    schema: config.db.schema
})
@Unique(['site', 'name'])
@Index(['id', 'site'], { unique: true })
@Index(['site', 'name'], { unique: true })
export class Post implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(_ => Site, site => site.posts, { nullable: false })
    @Index()
    @JoinColumn({ name: 'siteId' })
    site: Site;

    @Column()
    name: string;

    @ManyToMany(_ => Category, category => category.posts)
    @JoinTable()
    categories: Category[]

    @ManyToMany(_ => Asset, asset => asset.posts)
    @JoinTable()
    assets: Asset[];

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