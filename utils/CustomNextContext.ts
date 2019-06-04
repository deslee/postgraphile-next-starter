import {DefaultQuery} from "next-server/router";
import {NextContext} from "next";
import ApolloClient from "apollo-client";
import {NormalizedCacheObject} from "apollo-cache-inmemory";

export interface CustomNextContext<
    Q extends DefaultQuery = DefaultQuery,
    CustomReq = {}
> extends NextContext<Q, CustomReq> {
    apolloClient: ApolloClient<NormalizedCacheObject>
}