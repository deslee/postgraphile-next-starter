import { graphql, MutateProps, WithApolloClient } from 'react-apollo';
import { UpdatePostInput, UpdatePostPayload, CreatePostInput, CreatePostPayload, Post } from 'server/embeddedGraphql/bindings';
import gql from "graphql-tag";

const PostFragment = gql`
fragment postFragment on Post {
  id
  name
  type
  date
  data
  createdBy
  createdAt
  updatedBy
  updatedAt
}
`

export type UpdatePostInjectedProps = MutateProps<UpdatePostResult, UpdatePostVariables>;

export interface UpdatePostVariables {
    input: UpdatePostInput
}
export interface UpdatePostResult {
    updatePost: UpdatePostPayload
}

export const withUpdatePost = <T>() => graphql<T, UpdatePostResult, UpdatePostVariables>(gql`
    mutation UpdatePost($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post {
          ...postFragment
        }
      }
    }
    ${PostFragment}
`)

export interface CreatePostVariables {
    input: CreatePostInput
}
export interface CreatePostResult {
    createPost: CreatePostPayload
}
export type CreatePostInjectedProps = MutateProps<CreatePostResult, CreatePostVariables>;

export const withCreatePost = <T>() => graphql<T, CreatePostResult, CreatePostVariables>(gql`
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      ...postFragment
    }
  }
}
${PostFragment}
`)

export interface GetPostVariables {
  postId: number
}

export interface GetPostResult {
  post: Post
}

export const GET_POST_QUERY = gql`
  query PostById($postId: Int!) {
    post(id: $postId) {
      ...postFragment
    }
  }
  ${PostFragment}
`

export const POST_LIST_QUERY = gql`
query Posts {
  posts(orderBy: [DATE_DESC]) {
    ...postFragment
  }
}
${PostFragment}
`