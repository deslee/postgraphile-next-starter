import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { graphql, MutateProps, withApollo, WithApolloClient } from 'react-apollo';

import gql from "graphql-tag";
import { LoginPayload } from 'server/embeddedGraphql/bindings';
import Logout from './Logout';

interface ComponentProps {
}
interface Props extends WithApolloClient<ComponentProps>, MutateProps<LoginResult> {
}

const Login: React.FC<Props> = ({ mutate: login, client }) => {
    const emailEl = React.useRef<HTMLInputElement>(null);
    const passwordEl = React.useRef<HTMLInputElement>(null);

    return <>
        <form onSubmit={async e => {
            e.preventDefault();
            e.stopPropagation();
            const loginResult = await login({
                variables: {
                    email: emailEl.current.value,
                    password: passwordEl.current.value
                }
            })
            console.log(loginResult);
            if (loginResult && loginResult.data.login) {
                // Store the token in cookie
                // document.cookie = cookie.serialize('token', loginResult.data.login.token, {
                //     maxAge: 30 * 24 * 60 * 60 // 30 days
                // })
                // Force a reload of all the current queries now that the user is
                // logged in
                client.resetStore();
            }
        }}>
            <TextField label="Email" inputRef={emailEl} /><br />
            <TextField label="Password" type="password" inputRef={passwordEl} /><br />
            <Button type="submit">Login</Button>
        </form>
        <Logout />
    </>
}

export interface LoginResult {
    login: LoginPayload
}
export default withApollo(graphql<WithApolloClient<ComponentProps>, LoginResult>(gql`
mutation Login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
        token
        user {
            id
            email
        }
    }
}
`)(Login))