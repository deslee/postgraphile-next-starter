import * as React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import PostFormComponent from './PostForm';
import { PostInputWithData } from './PostData';
import { compose } from 'recompose';
import * as dayjs from 'dayjs';
import { withUpdatePost, UpdatePostInjectedProps, GET_POST_QUERY, GetPostResult, GetPostVariables, POST_LIST_QUERY, withDeletePost, DeletePostInjectedProps } from './PostQueries';
import { Query, withApollo, WithApolloClient } from 'react-apollo';

interface ComponentProps {
    postId: number;
    children?: React.ReactNode;
}

interface Props extends WithApolloClient<ComponentProps>, UpdatePostInjectedProps, DeletePostInjectedProps {
}

const useStyles = makeStyles(theme => ({
}))

const EditPost = ({ postId, mutate, deletePost, client }: Props) => {
    const classes = useStyles();
    console.log("render edit post")
    return <Query<GetPostResult, GetPostVariables> query={GET_POST_QUERY} variables={{ postId }}>{({ loading, data }) => {
        return !loading && data && data.post && <Formik<PostInputWithData>
        enableReinitialize={true}
        initialValues={{
            name: data.post.name,
            type: 'POST',
            date: dayjs(data.post.date).toISOString(),
            password: data.post.password || '',
            data: JSON.parse(data.post.data)
        }}
        onSubmit={async (values, actions) => {
            try {
                const result = await mutate({
                    variables: {
                        input: {
                            id: postId,
                            patch: {
                                ...values,
                                data: JSON.stringify(values.data)
                            }
                        }
                    },
                    refetchQueries: [{
                        query: POST_LIST_QUERY
                    }]
                })
                if (result && result.errors && result.errors.length) {
                    actions.setError(result.errors.map(e => e.message).join(', '))
                }
            } finally {
                actions.setSubmitting(false);
            }
        }}
        render={props => <PostFormComponent {...props} onDelete={async () => {
            try {
                props.setSubmitting(true);
                const result = await deletePost({
                    refetchQueries: [{query: POST_LIST_QUERY}]
                })
                if (result && result.errors && result.errors.length) {
                    props.setError(result.errors.map(e => e.message).join(', '))
                } else {
                    Router.push(`/posts`)
                }
            } catch(error) {
                props.setError(error.message);
            } finally {
                props.setSubmitting(false);
            }
        }} />}
    />
    }}</Query>
}

export default compose(
    withDeletePost<ComponentProps>(),
    withUpdatePost<ComponentProps>(),
    withApollo
)(EditPost) as React.ComponentType<ComponentProps>