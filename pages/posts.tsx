import * as React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { Grid, withStyles, WithStyles } from '@material-ui/core';
import { NextContext } from 'next';

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
            <Grid container direction="row">
                <Grid item className={classes.list} xs={3}>
                    <PostList />
                </Grid>
                <Grid item className={classes.content} xs={9}>
                    <div>hi, i'm on post {postId}</div>
                </Grid>
            </Grid>
        </Layout>
    }
}

export default withStyles(theme => ({
    list: {
    },
    content: {
    },
}))(Posts);