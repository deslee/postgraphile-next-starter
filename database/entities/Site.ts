import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Auditable } from './Auditable';
import config from "../../globalConfig";
import { Post } from './Post';
import { Category } from './Category';
import { User } from './User';
import { Asset } from './Asset';

@Entity({
    schema: config.db.schema
})
export class Site implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    @Index({unique: true})
    name: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @OneToMany(_ => Post, post => post.site)
    posts: Post[];

    @OneToMany(_ => Category, category => category.site)
    categories: Category[];

    @OneToMany(_ => Asset, asset => asset.site)
    assets: Asset[];

    @ManyToMany(_ => User, user => user.sites)
    @JoinTable()
    users: User[];

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}