import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import PostFormComponent from './PostForm';
import { PostInputWithData } from './PostData';
import { compose } from 'recompose';
import * as dayjs from 'dayjs';
import { withUpdatePost, UpdatePostInjectedProps, GET_POST_QUERY, GetPostResult, GetPostVariables, POST_LIST_QUERY } from './PostQueries';
import { Query } from 'react-apollo';

interface ComponentProps {
    postId: number;
    children?: React.ReactNode;
}

interface Props extends ComponentProps, UpdatePostInjectedProps {
}

const useStyles = makeStyles(theme => ({
}))

const EditPost = ({ postId, mutate }: Props) => {
    const classes = useStyles();
    return <Query<GetPostResult, GetPostVariables> query={GET_POST_QUERY} variables={{ postId }}>{({ loading, data }) => {
        return !loading && data && data.post && <Formik<PostInputWithData>
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
        component={PostFormComponent}
    />
    }}</Query>
}

export default withUpdatePost<ComponentProps>()(EditPost) as React.ComponentType<ComponentProps>