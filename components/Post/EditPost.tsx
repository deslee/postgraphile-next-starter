import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostForm from './PostForm';

interface ComponentProps {
    postId: String
}

interface Props extends ComponentProps {

}

const useStyles = makeStyles(theme => ({
}))

const EditPost = (props: Props) => {
    const classes = useStyles();
    return <PostForm /> 
}

export default EditPost;