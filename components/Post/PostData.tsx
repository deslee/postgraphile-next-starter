import { Omit } from '../../utils/TypeUtils';
import { PostInput, Post } from 'server/embeddedGraphql/bindings';

export interface PostData {
    title: string
}

export type PostInputWithData = Omit<PostInput, 'data'> & { data: PostData }
export type PostWithData = Omit<Post, "data"> & { data: PostData }