import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as uuid from 'uuid/v4';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import { Grid, List, ListItem, Divider, Typography } from '@material-ui/core';
import Link from 'next/link';
import { graphql, DataProps, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Post } from 'server/embeddedGraphql/bindings';
import { Omit } from '../../utils/TypeUtils';
import { PostData, PostWithData, jsonToPostData } from './PostData';
import {POST_LIST_QUERY, GetPostListVariables, GetPostListResult} from './PostQueries';

interface ComponentProps {
    type: string
    selected?: number
}

interface Props extends ComponentProps {
}


const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
        height: '100%'
    },
    row: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    noPostsMessage: {
        textAlign: 'center',
        paddingTop: theme.spacing(2)
    }
}));

const PostList = ({ type, selected }: Props) => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <List>
            <ListItem>
                <Grid container>
                    <Grid container item xs>Title</Grid>
                    <Grid container item xs={3}>Date</Grid>
                </Grid>
            </ListItem>
        </List>
        <Divider />
        <Query<GetPostListResult, GetPostListVariables> query={POST_LIST_QUERY} variables={{ type }}>{({ loading, data: { posts = [] } }) => <List>
            {posts.length === 0 && <Typography className={classes.noPostsMessage}>There seems to be nothing here</Typography>}
            {posts.map(p => ({ ...p, data: jsonToPostData(p.data) } as PostWithData)).map((post, i) => <React.Fragment key={post.id}>
                <Link href={`/posts?postId=${post.id}&type=${type}`} as={`/${type.toLowerCase()}s/${post.id}`}>
                    <ListItem button component="a" href={`/${type.toLowerCase()}s/${post.id}`} selected={post.id === selected}>
                        <Grid container className={classes.row}>
                            <Grid container item xs>{post.data.title}</Grid>
                            <Grid container item xs={3}>{dayjs(post.date).format('MM/DD/YYYY')}</Grid>
                        </Grid>
                    </ListItem>
                </Link>
                {i !== posts.length - 1 && <Divider />}
            </React.Fragment>)}
        </List>}</Query>
    </Paper>
}
export default PostList;