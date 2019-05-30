import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withApollo, Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import * as cookie from 'cookie';
import { LoginPayload, LoginInput } from 'server/embeddedGraphql/bindings';

const LOG_IN = gql`
mutation Login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
        token
        user {
            id
        }
    }
}
`

export default withApollo(({ client }) => {
    let email: any, password: any;

    return <Mutation<{ login: LoginPayload }, LoginInput>
        mutation={LOG_IN}
        onCompleted={({login}) => {
            // Store the token in cookie
            document.cookie = cookie.serialize('token', login.token, {
                maxAge: 30 * 24 * 60 * 60 // 30 days
            })
            console.log(login)
            // Force a reload of all the current queries now that the user is
            // logged in
            client.cache.reset().then(() => {
                //redirect({}, '/')
            })
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
})