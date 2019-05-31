import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withApollo, Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag'
import * as cookie from 'cookie';
import { LoginPayload, LoginInput, User } from 'server/embeddedGraphql/bindings';

const GET_SIGNED_IN_USER = gql`
query GetUser {
    me {
        id
        email
    }
}
`

const LOG_IN = gql`
mutation Login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
        token
        user {
            id
            email
        }
    }
}
`

export default withApollo(({ client }) => {
    let email: any, password: any;

    return <>
        <Query<{me?: User}> query={GET_SIGNED_IN_USER}
        >{({ data }) => <>
            User Id: {data && data.me && data.me.id}
        </>}</Query>
        <Mutation<{ login: LoginPayload }, LoginInput>
            mutation={LOG_IN}
            onCompleted={({ login }) => {
                // Store the token in cookie
                if (login) {
                    document.cookie = cookie.serialize('token', login.token, {
                        maxAge: 30 * 24 * 60 * 60 // 30 days
                    })
                    console.log(login)
                    // Force a reload of all the current queries now that the user is
                    // logged in
                    client.resetStore();
                }
            }}
        >{(login) => <form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            login({
                variables: {
                    email: email.value,
                    password: password.value
                }
            })
        }}>
            <TextField label="Email" inputRef={node => { email = node }} /><br />
            <TextField label="Password" type="password" inputRef={node => { password = node }} /><br />
            <Button type="submit">Login</Button>
        </form>}</Mutation>
    </>
})