import * as React from 'react';
import { Typography } from '@material-ui/core';
import { graphql, DataProps } from 'react-apollo';
import {jsonToUserData} from "./User/UserData";
import {GET_CURRENT_USER_QUERY, GetCurrentUserResult} from "./User/UserQueries";

interface ComponentProps {

}
interface Props extends DataProps<GetCurrentUserResult> {
}

const UserInfo: React.FC<Props> = ({ data: { loading, user: rawUser } }: Props) => {
    if (loading) {
        return <Typography>Loading</Typography>
    }
    if (!rawUser) {
        return <></>
    }
    const user = {...rawUser, data: jsonToUserData(rawUser.data)};
    return <Typography>Hello, {user.data.name} ({user.email})</Typography>
};

export default graphql<ComponentProps, GetCurrentUserResult>(GET_CURRENT_USER_QUERY)(UserInfo)