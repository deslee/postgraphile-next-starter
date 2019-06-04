import * as React from 'react';
import Router from 'next/router'
import { graphql, MutateProps, withApollo, WithApolloClient } from 'react-apollo';
import * as cookie from 'cookie';

import gql from "graphql-tag";

interface ComponentProps {
    children: React.ReactNode;
}
interface Props extends WithApolloClient<ComponentProps>, MutateProps<LogoutResult> {

}

const Logout: React.FC<Props> = ({client, mutate, children}: Props) => (
    <div onClick={async _ => {
        await mutate();
        document.cookie = cookie.serialize('X-XSRF-ID', '', {
            maxAge: Date.now(),
            expires: new Date()
        });
        client.resetStore();
        Router.push('/login')
    }}>{children}</div>
);


interface LogoutResult {
    logout: boolean
}
export default withApollo(graphql<WithApolloClient<ComponentProps>, LogoutResult>(gql`
mutation Logout {
    logout
}
`)(Logout))