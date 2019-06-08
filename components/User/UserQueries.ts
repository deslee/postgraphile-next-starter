import { graphql, MutateProps, WithApolloClient, MutationFn } from 'react-apollo';
import gql from "graphql-tag";
import {Asset, AssetInput, CreateAssetInput, CreateAssetPayload, User} from "../../schema";
import {Omit} from "../../utils/TypeUtils";

export const UserFragment = gql`
fragment userFragment on User {
    nodeId
    id
    email
    data
    createdBy
    updatedBy
    createdAt
    updatedAt
  }
`

export const GET_CURRENT_USER_QUERY = gql`
query GetCurrentUser {
    user: me {
        ...userFragment
    }
}
${UserFragment}
`;
export interface GetCurrentUserVariables {
}
export interface GetCurrentUserResult {
    user: User
}

