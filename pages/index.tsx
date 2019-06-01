import * as React from 'react';
import { Typography } from '@material-ui/core';
import { graphql, DataProps } from 'react-apollo';
import { User } from 'server/embeddedGraphql/bindings';
import Link from 'next/link';
import Login from '../components/Login'

import gql from "graphql-tag";

interface ComponentProps {

}
interface Props extends DataProps<MeResult> {
}

const Index: React.FC<Props> = ({ data: { loading, me } }: Props) => <>
    {loading && <Typography>Loading</Typography>}
    {!loading && me && <Typography>Hello, {me.email} (user {me.id})</Typography>}
    <Login />
    <Link href="/upload"><a>Upload an image</a></Link>
</>

export interface MeResult {
    me: User
}
export default graphql<ComponentProps, MeResult>(gql`
query GetUser {
    me {
        id
        email
    }
}`)(Index)