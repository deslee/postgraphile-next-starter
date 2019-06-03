import * as React from 'react';
import PostFormComponent from './PostForm';
import { graphql, MutateProps, WithApolloClient } from 'react-apollo';
import gql from "graphql-tag";
import { Formik } from 'formik';
import * as dayjs from 'dayjs';
import { PostInputWithData } from './PostData';
import { CreatePostInjectedProps, withCreatePost, POST_LIST_QUERY } from './PostQueries';
import Router from 'next/router';

interface ComponentProps {

}

interface Props extends ComponentProps, CreatePostInjectedProps  {

}

const NewPost = (props: Props) => {
    return <Formik<PostInputWithData>
        initialValues={{
            name: '',
            type: 'POST',
            date: dayjs(new Date()).toISOString(),
            password: '',
            data: {
                title: ''
            }
        }}
        onSubmit={async (values, actions) => {
            try {
                const result = await props.mutate({
                    variables: {
                        input: {
                            post: {
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
                if (result && result.data && result.data.createPost && result.data.createPost.post && result.data.createPost.post.id) {
                    Router.push(`/posts/${result.data.createPost.post.id}`)
                }
            } catch(e) {
                actions.setError(e.message);
            } finally {
                actions.setSubmitting(false);
            }
        }}
        component={PostFormComponent}
    />
}

export default withCreatePost<ComponentProps>()(NewPost) as React.ComponentType<ComponentProps>;