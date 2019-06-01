/* tslint:disable */
import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'


export interface Query {
    query: <T = Query>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    nodeId: <T = ID_Output>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assets: <T = Array<Asset> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<AssetsOrderBy> | null, condition?: AssetCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    categories: <T = Array<Category> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<CategoriesOrderBy> | null, condition?: CategoryCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    posts: <T = Array<Post> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<PostsOrderBy> | null, condition?: PostCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postAssetsAssets: <T = Array<PostAssetsAsset> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<PostAssetsAssetsOrderBy> | null, condition?: PostAssetsAssetCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postCategoriesCategories: <T = Array<PostCategoriesCategory> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<PostCategoriesCategoriesOrderBy> | null, condition?: PostCategoriesCategoryCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    sites: <T = Array<Site> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<SitesOrderBy> | null, condition?: SiteCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteUsersUsers: <T = Array<SiteUsersUser> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<SiteUsersUsersOrderBy> | null, condition?: SiteUsersUserCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    users: <T = Array<User> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<UsersOrderBy> | null, condition?: UserCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    asset: <T = Asset | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    category: <T = Category | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    categoryBySiteIdAndName: <T = Category | null>(args: { siteId: Int, name: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    post: <T = Post | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postBySiteIdAndName: <T = Post | null>(args: { siteId: Int, name: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postAssetsAsset: <T = PostAssetsAsset | null>(args: { postId: Int, assetId: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postCategoriesCategory: <T = PostCategoriesCategory | null>(args: { postId: Int, categoryId: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    site: <T = Site | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteByName: <T = Site | null>(args: { name: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteUsersUser: <T = SiteUsersUser | null>(args: { siteId: Int, userId: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    user: <T = User | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByEmail: <T = User | null>(args: { email: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    me: <T = User | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetByNodeId: <T = Asset | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    categoryByNodeId: <T = Category | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postByNodeId: <T = Post | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postAssetsAssetByNodeId: <T = PostAssetsAsset | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    postCategoriesCategoryByNodeId: <T = PostCategoriesCategory | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteByNodeId: <T = Site | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteUsersUserByNodeId: <T = SiteUsersUser | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByNodeId: <T = User | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Mutation {
    createAsset: <T = CreateAssetPayload | null>(args: { input: CreateAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createCategory: <T = CreateCategoryPayload | null>(args: { input: CreateCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createPost: <T = CreatePostPayload | null>(args: { input: CreatePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createPostAssetsAsset: <T = CreatePostAssetsAssetPayload | null>(args: { input: CreatePostAssetsAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createPostCategoriesCategory: <T = CreatePostCategoriesCategoryPayload | null>(args: { input: CreatePostCategoriesCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createSite: <T = CreateSitePayload | null>(args: { input: CreateSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createSiteUsersUser: <T = CreateSiteUsersUserPayload | null>(args: { input: CreateSiteUsersUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createUser: <T = CreateUserPayload | null>(args: { input: CreateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateAssetByNodeId: <T = UpdateAssetPayload | null>(args: { input: UpdateAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateAsset: <T = UpdateAssetPayload | null>(args: { input: UpdateAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateCategoryByNodeId: <T = UpdateCategoryPayload | null>(args: { input: UpdateCategoryByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateCategory: <T = UpdateCategoryPayload | null>(args: { input: UpdateCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateCategoryBySiteIdAndName: <T = UpdateCategoryPayload | null>(args: { input: UpdateCategoryBySiteIdAndNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostByNodeId: <T = UpdatePostPayload | null>(args: { input: UpdatePostByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePost: <T = UpdatePostPayload | null>(args: { input: UpdatePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostBySiteIdAndName: <T = UpdatePostPayload | null>(args: { input: UpdatePostBySiteIdAndNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostAssetsAssetByNodeId: <T = UpdatePostAssetsAssetPayload | null>(args: { input: UpdatePostAssetsAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostAssetsAsset: <T = UpdatePostAssetsAssetPayload | null>(args: { input: UpdatePostAssetsAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostCategoriesCategoryByNodeId: <T = UpdatePostCategoriesCategoryPayload | null>(args: { input: UpdatePostCategoriesCategoryByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePostCategoriesCategory: <T = UpdatePostCategoriesCategoryPayload | null>(args: { input: UpdatePostCategoriesCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteByNodeId: <T = UpdateSitePayload | null>(args: { input: UpdateSiteByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSite: <T = UpdateSitePayload | null>(args: { input: UpdateSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteByName: <T = UpdateSitePayload | null>(args: { input: UpdateSiteByNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteUsersUserByNodeId: <T = UpdateSiteUsersUserPayload | null>(args: { input: UpdateSiteUsersUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteUsersUser: <T = UpdateSiteUsersUserPayload | null>(args: { input: UpdateSiteUsersUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByNodeId: <T = UpdateUserPayload | null>(args: { input: UpdateUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUser: <T = UpdateUserPayload | null>(args: { input: UpdateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByEmail: <T = UpdateUserPayload | null>(args: { input: UpdateUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteAssetByNodeId: <T = DeleteAssetPayload | null>(args: { input: DeleteAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteAsset: <T = DeleteAssetPayload | null>(args: { input: DeleteAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteCategoryByNodeId: <T = DeleteCategoryPayload | null>(args: { input: DeleteCategoryByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteCategory: <T = DeleteCategoryPayload | null>(args: { input: DeleteCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteCategoryBySiteIdAndName: <T = DeleteCategoryPayload | null>(args: { input: DeleteCategoryBySiteIdAndNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostByNodeId: <T = DeletePostPayload | null>(args: { input: DeletePostByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePost: <T = DeletePostPayload | null>(args: { input: DeletePostInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostBySiteIdAndName: <T = DeletePostPayload | null>(args: { input: DeletePostBySiteIdAndNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostAssetsAssetByNodeId: <T = DeletePostAssetsAssetPayload | null>(args: { input: DeletePostAssetsAssetByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostAssetsAsset: <T = DeletePostAssetsAssetPayload | null>(args: { input: DeletePostAssetsAssetInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostCategoriesCategoryByNodeId: <T = DeletePostCategoriesCategoryPayload | null>(args: { input: DeletePostCategoriesCategoryByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deletePostCategoriesCategory: <T = DeletePostCategoriesCategoryPayload | null>(args: { input: DeletePostCategoriesCategoryInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteByNodeId: <T = DeleteSitePayload | null>(args: { input: DeleteSiteByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSite: <T = DeleteSitePayload | null>(args: { input: DeleteSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteByName: <T = DeleteSitePayload | null>(args: { input: DeleteSiteByNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteUsersUserByNodeId: <T = DeleteSiteUsersUserPayload | null>(args: { input: DeleteSiteUsersUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteUsersUser: <T = DeleteSiteUsersUserPayload | null>(args: { input: DeleteSiteUsersUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByNodeId: <T = DeleteUserPayload | null>(args: { input: DeleteUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUser: <T = DeleteUserPayload | null>(args: { input: DeleteUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByEmail: <T = DeleteUserPayload | null>(args: { input: DeleteUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    register: <T = RegisterPayload | null>(args: { input: RegisterInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updatePassword: <T = UpdatePasswordPayload | null>(args: { input: UpdatePasswordInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    login: <T = LoginPayload | null>(args: { input: LoginInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    logout: <T = Boolean>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
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
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'SITE_ID_ASC' |
  'SITE_ID_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `Category`.

 */
export type CategoriesOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'NAME_ASC' |
  'NAME_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'SITE_ID_ASC' |
  'SITE_ID_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `PostAssetsAsset`.

 */
export type PostAssetsAssetsOrderBy =   'NATURAL' |
  'POST_ID_ASC' |
  'POST_ID_DESC' |
  'ASSET_ID_ASC' |
  'ASSET_ID_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `PostCategoriesCategory`.

 */
export type PostCategoriesCategoriesOrderBy =   'NATURAL' |
  'POST_ID_ASC' |
  'POST_ID_DESC' |
  'CATEGORY_ID_ASC' |
  'CATEGORY_ID_DESC' |
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
  'PASSWORD_ASC' |
  'PASSWORD_DESC' |
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
  'SITE_ID_ASC' |
  'SITE_ID_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `Site`.

 */
export type SitesOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'NAME_ASC' |
  'NAME_DESC' |
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
 * Methods to use when ordering `SiteUsersUser`.

 */
export type SiteUsersUsersOrderBy =   'NATURAL' |
  'SITE_ID_ASC' |
  'SITE_ID_DESC' |
  'USER_ID_ASC' |
  'USER_ID_DESC' |
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
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId?: Int | null
}

/*
 * An input for mutations affecting `Asset`

 */
export interface AssetInput {
  id?: Int | null
  state: String
  data: JSON
  siteId: Int
}

/*
 * Represents an update to a `Asset`. Fields that are set will be updated.

 */
export interface AssetPatch {
  id?: Int | null
  state?: String | null
  data?: JSON | null
  siteId?: Int | null
}

/*
 * A condition to be used against `Category` object types. All fields are tested
, * for equality and combined with a logical ‘and.’

 */
export interface CategoryCondition {
  id?: Int | null
  data?: JSON | null
  name?: String | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId?: Int | null
}

/*
 * An input for mutations affecting `Category`

 */
export interface CategoryInput {
  id?: Int | null
  data: JSON
  name: String
  siteId: Int
}

/*
 * Represents an update to a `Category`. Fields that are set will be updated.

 */
export interface CategoryPatch {
  id?: Int | null
  data?: JSON | null
  name?: String | null
  siteId?: Int | null
}

/*
 * All input for the create `Asset` mutation.

 */
export interface CreateAssetInput {
  clientMutationId?: String | null
  asset: AssetInput
}

/*
 * All input for the create `Category` mutation.

 */
export interface CreateCategoryInput {
  clientMutationId?: String | null
  category: CategoryInput
}

/*
 * All input for the create `PostAssetsAsset` mutation.

 */
export interface CreatePostAssetsAssetInput {
  clientMutationId?: String | null
  postAssetsAsset: PostAssetsAssetInput
}

/*
 * All input for the create `PostCategoriesCategory` mutation.

 */
export interface CreatePostCategoriesCategoryInput {
  clientMutationId?: String | null
  postCategoriesCategory: PostCategoriesCategoryInput
}

/*
 * All input for the create `Post` mutation.

 */
export interface CreatePostInput {
  clientMutationId?: String | null
  post: PostInput
}

/*
 * All input for the create `Site` mutation.

 */
export interface CreateSiteInput {
  clientMutationId?: String | null
  site: SiteInput
}

/*
 * All input for the create `SiteUsersUser` mutation.

 */
export interface CreateSiteUsersUserInput {
  clientMutationId?: String | null
  siteUsersUser: SiteUsersUserInput
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
 * All input for the `deleteCategoryByNodeId` mutation.

 */
export interface DeleteCategoryByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteCategoryBySiteIdAndName` mutation.

 */
export interface DeleteCategoryBySiteIdAndNameInput {
  clientMutationId?: String | null
  siteId: Int
  name: String
}

/*
 * All input for the `deleteCategory` mutation.

 */
export interface DeleteCategoryInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deletePostAssetsAssetByNodeId` mutation.

 */
export interface DeletePostAssetsAssetByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deletePostAssetsAsset` mutation.

 */
export interface DeletePostAssetsAssetInput {
  clientMutationId?: String | null
  postId: Int
  assetId: Int
}

/*
 * All input for the `deletePostByNodeId` mutation.

 */
export interface DeletePostByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deletePostBySiteIdAndName` mutation.

 */
export interface DeletePostBySiteIdAndNameInput {
  clientMutationId?: String | null
  siteId: Int
  name: String
}

/*
 * All input for the `deletePostCategoriesCategoryByNodeId` mutation.

 */
export interface DeletePostCategoriesCategoryByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deletePostCategoriesCategory` mutation.

 */
export interface DeletePostCategoriesCategoryInput {
  clientMutationId?: String | null
  postId: Int
  categoryId: Int
}

/*
 * All input for the `deletePost` mutation.

 */
export interface DeletePostInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deleteSiteByName` mutation.

 */
export interface DeleteSiteByNameInput {
  clientMutationId?: String | null
  name: String
}

/*
 * All input for the `deleteSiteByNodeId` mutation.

 */
export interface DeleteSiteByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteSite` mutation.

 */
export interface DeleteSiteInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deleteSiteUsersUserByNodeId` mutation.

 */
export interface DeleteSiteUsersUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteSiteUsersUser` mutation.

 */
export interface DeleteSiteUsersUserInput {
  clientMutationId?: String | null
  siteId: Int
  userId: Int
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
 * A condition to be used against `PostAssetsAsset` object types. All fields are
, * tested for equality and combined with a logical ‘and.’

 */
export interface PostAssetsAssetCondition {
  postId?: Int | null
  assetId?: Int | null
}

/*
 * An input for mutations affecting `PostAssetsAsset`

 */
export interface PostAssetsAssetInput {
  postId: Int
  assetId: Int
}

/*
 * Represents an update to a `PostAssetsAsset`. Fields that are set will be updated.

 */
export interface PostAssetsAssetPatch {
  postId?: Int | null
  assetId?: Int | null
}

/*
 * A condition to be used against `PostCategoriesCategory` object types. All fields
, * are tested for equality and combined with a logical ‘and.’

 */
export interface PostCategoriesCategoryCondition {
  postId?: Int | null
  categoryId?: Int | null
}

/*
 * An input for mutations affecting `PostCategoriesCategory`

 */
export interface PostCategoriesCategoryInput {
  postId: Int
  categoryId: Int
}

/*
 * Represents an update to a `PostCategoriesCategory`. Fields that are set will be updated.

 */
export interface PostCategoriesCategoryPatch {
  postId?: Int | null
  categoryId?: Int | null
}

/*
 * A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface PostCondition {
  id?: Int | null
  name?: String | null
  password?: String | null
  type?: String | null
  date?: Datetime | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId?: Int | null
}

/*
 * An input for mutations affecting `Post`

 */
export interface PostInput {
  id?: Int | null
  name: String
  password?: String | null
  type?: String | null
  date?: Datetime | null
  data: JSON
  siteId: Int
}

/*
 * Represents an update to a `Post`. Fields that are set will be updated.

 */
export interface PostPatch {
  id?: Int | null
  name?: String | null
  password?: String | null
  type?: String | null
  date?: Datetime | null
  data?: JSON | null
  siteId?: Int | null
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
 * A condition to be used against `Site` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface SiteCondition {
  id?: Int | null
  name?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An input for mutations affecting `Site`

 */
export interface SiteInput {
  id?: Int | null
  name: String
  data: JSON
}

/*
 * Represents an update to a `Site`. Fields that are set will be updated.

 */
export interface SitePatch {
  id?: Int | null
  name?: String | null
  data?: JSON | null
}

/*
 * A condition to be used against `SiteUsersUser` object types. All fields are
, * tested for equality and combined with a logical ‘and.’

 */
export interface SiteUsersUserCondition {
  siteId?: Int | null
  userId?: Int | null
}

/*
 * An input for mutations affecting `SiteUsersUser`

 */
export interface SiteUsersUserInput {
  siteId: Int
  userId: Int
}

/*
 * Represents an update to a `SiteUsersUser`. Fields that are set will be updated.

 */
export interface SiteUsersUserPatch {
  siteId?: Int | null
  userId?: Int | null
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
 * All input for the `updateCategoryByNodeId` mutation.

 */
export interface UpdateCategoryByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: CategoryPatch
}

/*
 * All input for the `updateCategoryBySiteIdAndName` mutation.

 */
export interface UpdateCategoryBySiteIdAndNameInput {
  clientMutationId?: String | null
  patch: CategoryPatch
  siteId: Int
  name: String
}

/*
 * All input for the `updateCategory` mutation.

 */
export interface UpdateCategoryInput {
  clientMutationId?: String | null
  patch: CategoryPatch
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
 * All input for the `updatePostAssetsAssetByNodeId` mutation.

 */
export interface UpdatePostAssetsAssetByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: PostAssetsAssetPatch
}

/*
 * All input for the `updatePostAssetsAsset` mutation.

 */
export interface UpdatePostAssetsAssetInput {
  clientMutationId?: String | null
  patch: PostAssetsAssetPatch
  postId: Int
  assetId: Int
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
 * All input for the `updatePostBySiteIdAndName` mutation.

 */
export interface UpdatePostBySiteIdAndNameInput {
  clientMutationId?: String | null
  patch: PostPatch
  siteId: Int
  name: String
}

/*
 * All input for the `updatePostCategoriesCategoryByNodeId` mutation.

 */
export interface UpdatePostCategoriesCategoryByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: PostCategoriesCategoryPatch
}

/*
 * All input for the `updatePostCategoriesCategory` mutation.

 */
export interface UpdatePostCategoriesCategoryInput {
  clientMutationId?: String | null
  patch: PostCategoriesCategoryPatch
  postId: Int
  categoryId: Int
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
 * All input for the `updateSiteByName` mutation.

 */
export interface UpdateSiteByNameInput {
  clientMutationId?: String | null
  patch: SitePatch
  name: String
}

/*
 * All input for the `updateSiteByNodeId` mutation.

 */
export interface UpdateSiteByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: SitePatch
}

/*
 * All input for the `updateSite` mutation.

 */
export interface UpdateSiteInput {
  clientMutationId?: String | null
  patch: SitePatch
  id: Int
}

/*
 * All input for the `updateSiteUsersUserByNodeId` mutation.

 */
export interface UpdateSiteUsersUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: SiteUsersUserPatch
}

/*
 * All input for the `updateSiteUsersUser` mutation.

 */
export interface UpdateSiteUsersUserInput {
  clientMutationId?: String | null
  patch: SiteUsersUserPatch
  siteId: Int
  userId: Int
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
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId: Int
  site?: Site | null
  postAssetsAssets: Array<PostAssetsAsset>
}

export interface Category extends Node {
  nodeId: ID_Output
  id: Int
  data: JSON
  name: String
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId: Int
  site?: Site | null
  postCategoriesCategories: Array<PostCategoriesCategory>
}

/*
 * The output of our create `Asset` mutation.

 */
export interface CreateAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our create `Category` mutation.

 */
export interface CreateCategoryPayload {
  clientMutationId?: String | null
  category?: Category | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our create `PostAssetsAsset` mutation.

 */
export interface CreatePostAssetsAssetPayload {
  clientMutationId?: String | null
  postAssetsAsset?: PostAssetsAsset | null
  query?: Query | null
  post?: Post | null
  asset?: Asset | null
}

/*
 * The output of our create `PostCategoriesCategory` mutation.

 */
export interface CreatePostCategoriesCategoryPayload {
  clientMutationId?: String | null
  postCategoriesCategory?: PostCategoriesCategory | null
  query?: Query | null
  post?: Post | null
  category?: Category | null
}

/*
 * The output of our create `Post` mutation.

 */
export interface CreatePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our create `Site` mutation.

 */
export interface CreateSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  query?: Query | null
}

/*
 * The output of our create `SiteUsersUser` mutation.

 */
export interface CreateSiteUsersUserPayload {
  clientMutationId?: String | null
  siteUsersUser?: SiteUsersUser | null
  query?: Query | null
  site?: Site | null
  user?: User | null
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
  site?: Site | null
}

/*
 * The output of our delete `Category` mutation.

 */
export interface DeleteCategoryPayload {
  clientMutationId?: String | null
  category?: Category | null
  deletedCategoryNodeId?: ID_Output | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our delete `PostAssetsAsset` mutation.

 */
export interface DeletePostAssetsAssetPayload {
  clientMutationId?: String | null
  postAssetsAsset?: PostAssetsAsset | null
  deletedPostAssetsAssetNodeId?: ID_Output | null
  query?: Query | null
  post?: Post | null
  asset?: Asset | null
}

/*
 * The output of our delete `PostCategoriesCategory` mutation.

 */
export interface DeletePostCategoriesCategoryPayload {
  clientMutationId?: String | null
  postCategoriesCategory?: PostCategoriesCategory | null
  deletedPostCategoriesCategoryNodeId?: ID_Output | null
  query?: Query | null
  post?: Post | null
  category?: Category | null
}

/*
 * The output of our delete `Post` mutation.

 */
export interface DeletePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  deletedPostNodeId?: ID_Output | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our delete `Site` mutation.

 */
export interface DeleteSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  deletedSiteNodeId?: ID_Output | null
  query?: Query | null
}

/*
 * The output of our delete `SiteUsersUser` mutation.

 */
export interface DeleteSiteUsersUserPayload {
  clientMutationId?: String | null
  siteUsersUser?: SiteUsersUser | null
  deletedSiteUsersUserNodeId?: ID_Output | null
  query?: Query | null
  site?: Site | null
  user?: User | null
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
  password?: String | null
  type?: String | null
  date?: Datetime | null
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  siteId: Int
  site?: Site | null
  postCategoriesCategories: Array<PostCategoriesCategory>
  postAssetsAssets: Array<PostAssetsAsset>
}

export interface PostAssetsAsset extends Node {
  nodeId: ID_Output
  postId: Int
  assetId: Int
  post?: Post | null
  asset?: Asset | null
}

export interface PostCategoriesCategory extends Node {
  nodeId: ID_Output
  postId: Int
  categoryId: Int
  post?: Post | null
  category?: Category | null
}

/*
 * The output of our `register` mutation.

 */
export interface RegisterPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

export interface Site extends Node {
  nodeId: ID_Output
  id: Int
  name: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
  categories: Array<Category>
  posts: Array<Post>
  assets: Array<Asset>
  siteUsersUsers: Array<SiteUsersUser>
}

export interface SiteUsersUser extends Node {
  nodeId: ID_Output
  siteId: Int
  userId: Int
  site?: Site | null
  user?: User | null
}

/*
 * The output of our update `Asset` mutation.

 */
export interface UpdateAssetPayload {
  clientMutationId?: String | null
  asset?: Asset | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our update `Category` mutation.

 */
export interface UpdateCategoryPayload {
  clientMutationId?: String | null
  category?: Category | null
  query?: Query | null
  site?: Site | null
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
 * The output of our update `PostAssetsAsset` mutation.

 */
export interface UpdatePostAssetsAssetPayload {
  clientMutationId?: String | null
  postAssetsAsset?: PostAssetsAsset | null
  query?: Query | null
  post?: Post | null
  asset?: Asset | null
}

/*
 * The output of our update `PostCategoriesCategory` mutation.

 */
export interface UpdatePostCategoriesCategoryPayload {
  clientMutationId?: String | null
  postCategoriesCategory?: PostCategoriesCategory | null
  query?: Query | null
  post?: Post | null
  category?: Category | null
}

/*
 * The output of our update `Post` mutation.

 */
export interface UpdatePostPayload {
  clientMutationId?: String | null
  post?: Post | null
  query?: Query | null
  site?: Site | null
}

/*
 * The output of our update `Site` mutation.

 */
export interface UpdateSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  query?: Query | null
}

/*
 * The output of our update `SiteUsersUser` mutation.

 */
export interface UpdateSiteUsersUserPayload {
  clientMutationId?: String | null
  siteUsersUser?: SiteUsersUser | null
  query?: Query | null
  site?: Site | null
  user?: User | null
}

/*
 * The output of our update `User` mutation.

 */
export interface UpdateUserPayload {
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
  siteUsersUsers: Array<SiteUsersUser>
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