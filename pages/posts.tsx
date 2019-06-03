import * as React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { Grid, withStyles, WithStyles, Fab } from '@material-ui/core';
import { NextContext } from 'next';
import constants from '../constants';
import AddIcon from '@material-ui/icons/Add';
import NewPost from '../components/Post/NewPost';
import Link from 'next/link';
import EditPost from '../components/Post/EditPost'; 

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
                    <Link href={`/posts?postId=new`} as="/posts/new">
                        <Fab color="secondary" aria-label="Add" className={classes.addPostFab} component="a" href="/posts/new">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Grid>
                <Grid item className={classes.content} xs={12} md={6} lg={8} xl={9}>
                    { postId === 'new' ? <NewPost /> : ( postId && parseInt(postId) !== NaN && <EditPost postId={parseInt(postId)} /> ) }
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
        position: 'relative'
    },
    content: {
        height: '100%',
        overflow: 'auto',
    },
    addPostFab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}))(Posts);