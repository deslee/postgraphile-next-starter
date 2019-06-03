/* tslint:disable */
import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'


export interface Query {
    query: <T = Query>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    nodeId: <T = ID_Output>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assets: <T = Array<Asset> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<AssetsOrderBy> | null, condition?: AssetCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    posts: <T = Array<Post> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<PostsOrderBy> | null, condition?: PostCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    users: <T = Array<User> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<UsersOrderBy> | null, condition?: UserCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    asset: <T = Asset | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    post: <T = Post | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postByType: <T = Post | null>(args: { type: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    user: <T = User | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByEmail: <T = User | null>(args: { email: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    me: <T = User | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetByNodeId: <T = Asset | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postByNodeId: <T = Post | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByNodeId: <T = User | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Mutation {
    createAsset: <T = CreateAssetPayload | null>(args: { input: CreateAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createPost: <T = CreatePostPayload | null>(args: { input: CreatePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createUser: <T = CreateUserPayload | null>(args: { input: CreateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateAssetByNodeId: <T = UpdateAssetPayload | null>(args: { input: UpdateAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateAsset: <T = UpdateAssetPayload | null>(args: { input: UpdateAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostByNodeId: <T = UpdatePostPayload | null>(args: { input: UpdatePostByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePost: <T = UpdatePostPayload | null>(args: { input: UpdatePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostByType: <T = UpdatePostPayload | null>(args: { input: UpdatePostByTypeInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByNodeId: <T = UpdateUserPayload | null>(args: { input: UpdateUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUser: <T = UpdateUserPayload | null>(args: { input: UpdateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByEmail: <T = UpdateUserPayload | null>(args: { input: UpdateUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteAssetByNodeId: <T = DeleteAssetPayload | null>(args: { input: DeleteAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteAsset: <T = DeleteAssetPayload | null>(args: { input: DeleteAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostByNodeId: <T = DeletePostPayload | null>(args: { input: DeletePostByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePost: <T = DeletePostPayload | null>(args: { input: DeletePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostByType: <T = DeletePostPayload | null>(args: { input: DeletePostByTypeInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByNodeId: <T = DeleteUserPayload | null>(args: { input: DeleteUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUser: <T = DeleteUserPayload | null>(args: { input: DeleteUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByEmail: <T = DeleteUserPayload | null>(args: { input: DeleteUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    register: <T = RegisterPayload | null>(args: { input: RegisterInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePassword: <T = UpdatePasswordPayload | null>(args: { input: UpdatePasswordInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    login: <T = LoginPayload | null>(args: { input: LoginInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    logout: <T = Boolean>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertAsset: <T = UpsertAssetPayload | null>(args: { input: UpsertAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    upsertPost: <T = UpsertPostPayload | null>(args: { input: UpsertPostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    upsertUser: <T = UpsertUserPayload | null>(args: { input: UpsertUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Subscription {}

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}



/**
 * Types
*/

/*
 * Methods to use when ordering `Asset`.

 */
export type AssetsOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'STATE_ASC' |
  'STATE_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'URI_ASC' |
  'URI_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `Post`.

 */
export type PostsOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'NAME_ASC' |
  'NAME_DESC' |
  'TYPE_ASC' |
  'TYPE_DESC' |
  'DATE_ASC' |
  'DATE_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'PASSWORD_ASC' |
  'PASSWORD_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `User`.

 */
export type UsersOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'EMAIL_ASC' |
  'EMAIL_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * A condition to be used against `Asset` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface AssetCondition {
  id?: Int | null
  state?: String | null
  data?: JSON | null
  uri?: String | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An input for mutations affecting `Asset`

 */
export interface AssetInput {
  id?: Int | null
  state: String
  data: JSON
  uri?: Upload | null
}

/*
 * Represents an update to a `Asset`. Fields that are set will be updated.

 */
export interface AssetPatch {
  id?: Int | null
  state?: String | null
  data?: JSON | null
  uri?: Upload | null
}

/*
 * All input for the create `Asset` mutation.

 */
export interface CreateAssetInput {
  clientMutationId?: String | null
  asset: AssetInput
}

/*
 * All input for the create `Post` mutation.

 */
export interface CreatePostInput {
  clientMutationId?: String | null
  post: PostInput
}

/*
 * All input for the create `User` mutation.

 */
export interface CreateUserInput {
  clientMutationId?: String | null
  user: UserInput
}

/*
 * All input for the `deleteAssetByNodeId` mutation.

 */
export interface DeleteAssetByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteAsset` mutation.

 */
export interface DeleteAssetInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deletePostByNodeId` mutation.

 */
export interface DeletePostByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deletePostByType` mutation.

 */
export interface DeletePostByTypeInput {
  clientMutationId?: String | null
  type: String
}

/*
 * All input for the `deletePost` mutation.

 */
export interface DeletePostInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deleteUserByEmail` mutation.

 */
export interface DeleteUserByEmailInput {
  clientMutationId?: String | null
  email: String
}

/*
 * All input for the `deleteUserByNodeId` mutation.

 */
export interface DeleteUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteUser` mutation.

 */
export interface DeleteUserInput {
  clientMutationId?: String | null
  id: Int
}

export interface LoginInput {
  email: String
  password: String
}

/*
 * A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface PostCondition {
  id?: Int | null
  name?: String | null
  type?: String | null
  date?: Datetime | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  password?: String | null
}

/*
 * An input for mutations affecting `Post`

 */
export interface PostInput {
  id?: Int | null
  name: String
  type?: String | null
  date?: Datetime | null
  data: JSON
  password?: String | null
}

/*
 * Represents an update to a `Post`. Fields that are set will be updated.

 */
export interface PostPatch {
  id?: Int | null
  name?: String | null
  type?: String | null
  date?: Datetime | null
  data?: JSON | null
  password?: String | null
}

/*
 * All input for the `register` mutation.

 */
export interface RegisterInput {
  clientMutationId?: String | null
  email: String
  password: String
  data: JSON
}

/*
 * All input for the `updateAssetByNodeId` mutation.

 */
export interface UpdateAssetByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: AssetPatch
}

/*
 * All input for the `updateAsset` mutation.

 */
export interface UpdateAssetInput {
  clientMutationId?: String | null
  patch: AssetPatch
  id: Int
}

/*
 * All input for the `updatePassword` mutation.

 */
export interface UpdatePasswordInput {
  clientMutationId?: String | null
  userId: Int
  newPassword: String
}

/*
 * All input for the `updatePostByNodeId` mutation.

 */
export interface UpdatePostByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: PostPatch
}

/*
 * All input for the `updatePostByType` mutation.

 */
export interface UpdatePostByTypeInput {
  clientMutationId?: String | null
  patch: PostPatch
  type: String
}

/*
 * All input for the `updatePost` mutation.

 */
export interface UpdatePostInput {
  clientMutationId?: String | null
  patch: PostPatch
  id: Int
}

/*
 * All input for the `updateUserByEmail` mutation.

 */
export interface UpdateUserByEmailInput {
  clientMutationId?: String | null
  patch: UserPatch
  email: String
}

/*
 * All input for the `updateUserByNodeId` mutation.

 */
export interface UpdateUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: UserPatch
}

/*
 * All input for the `updateUser` mutation.

 */
export interface UpdateUserInput {
  clientMutationId?: String | null
  patch: UserPatch
  id: Int
}

/*
 * All input for the upsert `Asset` mutation.

 */
export interface UpsertAssetInput {
  clientMutationId?: String | null
  asset: AssetInput
}

/*
 * All input for the upsert `Post` mutation.

 */
export interface UpsertPostInput {
  clientMutationId?: String | null
  post: PostInput
}

/*
 * All input for the upsert `User` mutation.

 */
export interface UpsertUserInput {
  clientMutationId?: String | null
  user: UserInput
}

/*
 * A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface UserCondition {
  id?: Int | null
  email?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An input for mutations affecting `User`

 */
export interface UserInput {
  id?: Int | null
  email: String
  data: JSON
}

/*
 * Represents an update to a `User`. Fields that are set will be updated.

 */
export interface UserPatch {
  id?: Int | null
  email?: String | null
  data?: JSON | null
}

/*
 * An object with a globally unique `ID`.

 */
export interface Node {
  nodeId: ID_Output
}

export interface Asset extends Node {
  nodeId: ID_Output
  id: Int
  state: String
  data: JSON
  uri?: String | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * The output of our create `Asset` mutation.

 */
export interface CreateAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  query?: Query | null
}

/*
 * The output of our create `Post` mutation.

 */
export interface CreatePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  query?: Query | null
}

/*
 * The output of our create `User` mutation.

 */
export interface CreateUserPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

/*
 * The output of our delete `Asset` mutation.

 */
export interface DeleteAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  deletedAssetNodeId?: ID_Output | null
  query?: Query | null
}

/*
 * The output of our delete `Post` mutation.

 */
export interface DeletePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  deletedPostNodeId?: ID_Output | null
  query?: Query | null
}

/*
 * The output of our delete `User` mutation.

 */
export interface DeleteUserPayload {
  clientMutationId?: String | null
  user?: User | null
  deletedUserNodeId?: ID_Output | null
  query?: Query | null
}

export interface LoginPayload {
  user?: User | null
  query?: Query | null
  token: String
}

export interface Post extends Node {
  nodeId: ID_Output
  id: Int
  name: String
  type?: String | null
  date?: Datetime | null
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  password?: String | null
}

/*
 * The output of our `register` mutation.

 */
export interface RegisterPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

/*
 * The output of our update `Asset` mutation.

 */
export interface UpdateAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  query?: Query | null
}

/*
 * The output of our `updatePassword` mutation.

 */
export interface UpdatePasswordPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

/*
 * The output of our update `Post` mutation.

 */
export interface UpdatePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  query?: Query | null
}

/*
 * The output of our update `User` mutation.

 */
export interface UpdateUserPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

/*
 * The output of our upsert `Asset` mutation.

 */
export interface UpsertAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  query?: Query | null
}

/*
 * The output of our upsert `Post` mutation.

 */
export interface UpsertPostPayload {
  clientMutationId?: String | null
  post?: Post | null
  query?: Query | null
}

/*
 * The output of our upsert `User` mutation.

 */
export interface UpsertUserPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

export interface User extends Node {
  nodeId: ID_Output
  id: Int
  email: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
*/
export type Datetime = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
*/
export type JSON = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Upload` scalar type represents a file upload.
*/
export type Upload = string