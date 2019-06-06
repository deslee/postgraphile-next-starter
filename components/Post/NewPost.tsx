import * as React from 'react';
import PostFormComponent from './PostForm';
import { graphql, MutateProps, WithApolloClient } from 'react-apollo';
import gql from "graphql-tag";
import { Formik } from 'formik';
import * as dayjs from 'dayjs';
import { PostInputWithData, postDataToJson, PostInputWithDataShape } from './PostData';
import { CreatePostInjectedProps, withCreatePost, POST_LIST_QUERY } from './PostQueries';
import Router from 'next/router';
import { useSnackbar } from 'notistack';


interface ComponentProps {
    type: string;
}

interface Props extends ComponentProps, CreatePostInjectedProps {

}

const NewPost = ({ type, mutate }: Props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return <Formik<PostInputWithData>
        initialValues={{
            name: '',
            type,
            date: dayjs(new Date()).toISOString(),
            password: '',
            data: {
                title: '',
                slices: []
            }
        }}
        validationSchema={PostInputWithDataShape}
        onSubmit={async (values, actions) => {
            try {
                const result = await mutate({
                    variables: {
                        input: {
                            post: {
                                ...values,
                                data: postDataToJson(values.data)
                            }
                        }
                    },
                    refetchQueries: [{
                        query: POST_LIST_QUERY,
                        variables: {
                            type
                        }
                    }]
                });
                if (result && result.errors && result.errors.length) {
                    actions.setError(result.errors.map(e => e.message).join(', '))
                }
                if (result && result.data && result.data.createPost && result.data.createPost.post && result.data.createPost.post.id) {
                    actions.resetForm();
                    Router.push(`/${type.toLowerCase()}s?postId=${result.data.createPost.post.id}`, `/${type.toLowerCase()}s/${result.data.createPost.post.id}`)
                }
                enqueueSnackbar('Success!', {
                    variant: 'success'
                })
            } catch (e) {
                actions.setError(e.message);
            } finally {
                actions.setSubmitting(false);
            }
        }}
        render={props => <PostFormComponent {...props} type={type} />}
    />
}

export default withCreatePost<ComponentProps>()(NewPost) as React.ComponentType<ComponentProps>;