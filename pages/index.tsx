import * as React from 'react';
import { Typography, Paper, Grid, Container, makeStyles } from '@material-ui/core';
import { graphql, DataProps } from 'react-apollo';
import { User } from 'server/embeddedGraphql/bindings';
import Link from 'next/link';
import Login from '../components/Login'
import gql from "graphql-tag";
import UserInfo from '../components/UserInfo';
import Register from '../components/Register';
import UploadAsset from '../components/UploadAsset';

interface ComponentProps {

}
interface Props {
}

const useStyles = makeStyles(theme => ({
    sheet: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2),
    },
}));


const Index: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return <Container>
        <UserInfo />
        <Grid container>
            <Grid item xs>
                <Paper className={classes.sheet}>
                    <Register />
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.sheet}>
                    <Login />
                </Paper>
            </Grid>
        </Grid>
        <Grid item xs>
            <Paper className={classes.sheet}>
                <UploadAsset />
            </Paper>
        </Grid>
    </Container>
}

export default Index