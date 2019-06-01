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