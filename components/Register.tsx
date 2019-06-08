import * as React from 'react';
import * as yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { graphql, MutateProps, withApollo, WithApolloClient } from 'react-apollo';
import { RegisterInputShape } from '../schema/validators';
import gql from "graphql-tag";
import { RegisterPayload, RegisterInput } from 'schema';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

interface ComponentProps {
}
interface Props extends WithApolloClient<ComponentProps>, MutateProps<RegisterResult, RegisterVariables> {

}

const RegisterFormShape = RegisterInputShape.clone().shape({
    name: yup.string().required()
})

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC<Props> = ({ client, mutate }: Props) => <>
    <Formik<RegisterForm>
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={RegisterFormShape}
        onSubmit={async (values, actions) => {
            try {
                await mutate({
                    variables: {
                        input: {
                            email: values.email,
                            password: values.password,
                            data: JSON.stringify({
                                name: values.name
                            })
                        }
                    }
                });
            }
            finally {
                actions.setSubmitting(false);
            }
        }}
    >{({ errors, touched }) => <Form>
        <Field name="name" component={TextField} type="text" label="Name" /><br />
        <Field name="email" component={TextField} type="text" label="Email" /><br />
        <Field name="password" component={TextField} type="password" label="Password" /><br />
        <Button type="submit">Register</Button>
    </Form>}</Formik>
</>

interface RegisterVariables {
    input: RegisterInput
}
interface RegisterResult {
    register: RegisterPayload
}
export default withApollo(graphql<WithApolloClient<ComponentProps>, RegisterResult, RegisterVariables>(gql`
mutation Register($input: RegisterInput!) {
    register(input: $input) {
        user {
            id
            email
            data
        }
    }
}
`)(Register))