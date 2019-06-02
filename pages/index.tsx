import * as React from 'react';
import { Typography, Paper, Grid, makeStyles, Container } from '@material-ui/core';
import Login from '../components/LoginForm'
import UserInfo from '../components/UserInfo';
import Register from '../components/Register';
import UploadAsset from '../components/UploadAsset';
import Layout from '../components/Layout';
import Logout from '../components/Logout';

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

    return <Layout title="Dashboard">
        <UserInfo />
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs>
                    <Paper className={classes.sheet}>
                        <Typography variant="h4">Register</Typography>
                        <Register />
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.sheet}>
                        <Typography variant="h4">Login</Typography>
                        <Login />
                        <Logout />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs>
                <Paper className={classes.sheet}>
                    <UploadAsset />
                </Paper>
            </Grid>
        </Container>
    </Layout>
}

export default Index