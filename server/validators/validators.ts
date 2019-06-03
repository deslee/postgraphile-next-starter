import * as yup from 'yup';

export const RegisterInputShape = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6, 'Password must be at least 6 characters')
})

export const LoginInputShape = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export const UpdatePasswordInputShape = yup.object().shape({
    userId: yup.number().required().integer(),
    newPassword: yup.string().required().min(6, 'Password must be at least 6 characters')
})

export const PostInputShape = yup.object().shape({
    name: yup.string().required().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be URL friendly'),
    type: yup.string().required(),
    date: yup.date(),
    password: yup.string()
})