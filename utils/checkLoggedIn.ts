import ApolloClient, {ApolloQueryResult} from "apollo-client";
import {NormalizedCacheObject} from "apollo-cache-inmemory";
import {GET_CURRENT_USER_QUERY, GetCurrentUserResult} from "../components/User/UserQueries";
import {jsonToUserData, UserWithData} from "../components/User/UserData";

export default async (apolloClient: ApolloClient<NormalizedCacheObject>): Promise<UserWithData | undefined> => {
    try {
        const result: ApolloQueryResult<GetCurrentUserResult> = await apolloClient.query({query: GET_CURRENT_USER_QUERY});
        return result.data ? { ...result.data.user, data: jsonToUserData(result.data.user.data) } : undefined;
    } catch {
        return undefined;
    }
};
