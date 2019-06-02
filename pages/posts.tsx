import * as React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { Grid, withStyles, WithStyles, Paper, Container } from '@material-ui/core';
import { NextContext } from 'next';
import LoginForm from '../components/LoginForm';
import constants from '../constants';

interface InitialProps {
    postId?: string
}

interface Props extends WithStyles, InitialProps {

}

class Posts extends React.Component<Props> {

    static getInitialProps({ query: { postId } }: NextContext): InitialProps {
        return { postId: typeof postId === 'string' && postId }
    }
    render() {
        const { classes, postId } = this.props;

        return <Layout title="Posts">
            <Grid container direction="row" className={classes.container}>
                <Grid item className={classes.list} sm={12} md={6} lg={4} xl={3}>
                    <PostList />
                </Grid>
                <Grid item className={classes.content} xs={12} md={6} lg={8} xl={9}>
                    <Paper className={classes.contentPaper}>
                        Hello world - post {postId}
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    }
}

export default withStyles(theme => ({
    container: {
        height: `calc(100vh - ${constants.appBarHeight}px)`,
        width: '100%',
        overflow: 'hidden',
    },
    list: {
        height: '100%',
        overflowY: 'auto',
    },
    content: {
        height: '100%',
        overflow: 'auto',
    },
    contentPaper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4),
        minHeight: `calc(100% - ${theme.spacing(3)*2}px)`,
    },
}))(Posts);