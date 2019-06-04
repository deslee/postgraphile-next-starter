import * as React from 'react';
import {Typography, Paper, Grid, makeStyles, Container, WithStyles} from '@material-ui/core';
import UserInfo from '../components/UserInfo';
import Register from '../components/Register';
import Layout from '../components/Layout';
import Logout from '../components/Logout';
import withStyles from "@material-ui/core/styles/withStyles";
import {CustomNextContext} from "../utils/CustomNextContext";
import checkLoggedIn from "../utils/checkLoggedIn";
import redirect from "../utils/redirect";

interface InitialProps {
}

interface Props extends InitialProps, WithStyles {
}

class Index extends React.Component<Props> {
    static async getInitialProps(ctx: CustomNextContext): Promise<InitialProps> {
        const loggedInUser = await checkLoggedIn(ctx.apolloClient);
        if (!loggedInUser) {
            redirect(ctx, "/login");
        }
        return {}
    }

    render() {
        const { classes } = this.props;
        return <Layout title="Dashboard">
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs>
                        <Paper className={classes.sheet}>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.sheet}>
                            <UserInfo />
                            <Logout />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    }
}


export default withStyles(theme => ({
    sheet: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2),
    },
}))(Index)