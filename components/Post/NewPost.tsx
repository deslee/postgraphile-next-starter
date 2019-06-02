import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostForm from './PostForm';

interface Props {

}

const useStyles = makeStyles(theme => ({
}))

const NewPost = (props: Props) => {
    const classes = useStyles();
    return <PostForm />
}

export default NewPost;