import * as React from 'react';
import { Typography } from '@material-ui/core';
import { graphql, DataProps } from 'react-apollo';
import { User } from 'server/embeddedGraphql/bindings';

import gql from "graphql-tag";

interface ComponentProps {

}
interface Props extends DataProps<MeResult> {
}

const UserInfo: React.FC<Props> = ({ data: { loading, me } }: Props) => <>
    {loading && <Typography>Loading</Typography>}
    {!loading && me && <Typography>Hello, {me.email} (user {me.id})</Typography>}
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
}`)(UserInfo)