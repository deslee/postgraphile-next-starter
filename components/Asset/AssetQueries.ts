import { graphql, MutateProps, WithApolloClient, MutationFn } from 'react-apollo';
import gql from "graphql-tag";
import {Asset, AssetInput, CreateAssetInput, CreateAssetPayload} from "../../server/embeddedGraphql/bindings";
import {Omit} from "../../utils/TypeUtils";

export const AssetFragment = gql`
fragment assetFragment on Asset {
    id
    state
    data
    uri
    createdBy
    updatedBy
    createdAt
    updatedAt
  }
`

export interface CreateAssetVariables {
    input: Omit<CreateAssetInput, "asset"> & {
        asset: Omit<AssetInput, "uri"> & {
            uri: File
        }
    }
}

export interface CreateAssetResult {
    createAsset: CreateAssetPayload;
}

export interface CreateAssetInjectedProps {
    createAsset: MutationFn<CreateAssetResult, CreateAssetVariables>
}

export const CREATE_ASSET_MUTATION = gql`
    mutation createAsset($input: CreateAssetInput!) {
        createAsset(input: $input) {
            asset {
                ...assetFragment
            }
        }
    }
    ${AssetFragment}
`;

export const withCreateAsset = <T>() => graphql<T, CreateAssetResult, CreateAssetVariables, CreateAssetInjectedProps>(
    CREATE_ASSET_MUTATION,
    {
        props: props => ({ createAsset: props.mutate })
    }
);

export interface GetAssetListVariables {

}

export interface GetAssetListResult {
    assets: Asset[]
}

export const ASSET_LIST_QUERY = gql`
query Assets {
    assets(orderBy: [UPDATED_BY_DESC]) {
        ...assetFragment
    }
}
${AssetFragment}
`;

export interface DeleteAssetVariables {
    assetId: number;
}

export interface DeleteAssetResult {

}

export const DELETE_ASSET_MUTATION = gql`
mutation DeleteAsset($assetId: Int!) {
    deleteAsset(input: {id: $assetId}) {
        clientMutationId
    }
}
`;
export type DeleteAssetInjectedProps = {
    deleteAsset: MutationFn<DeleteAssetResult, DeleteAssetVariables>
}
export const withDeleteAsset = <T>() => graphql<T, DeleteAssetResult, DeleteAssetVariables, DeleteAssetInjectedProps>(DELETE_ASSET_MUTATION, {
    props: props => ({
        deleteAsset: props.mutate
    })
});