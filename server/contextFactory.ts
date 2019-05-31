import validatorFactory from './validators/serverSideValidators';
import { Binding } from './embeddedGraphql/bindings'
import { UserInputError } from 'apollo-server-core';
import { ValidationError } from 'yup';
import { AuthenticatedSession } from './Authentication';

export default (binding: Binding, user?: AuthenticatedSession) => {
    const validators = validatorFactory(binding);
    const pgSettings = {}
    if (user && user.userId) {
        pgSettings['claims.userId'] = user.userId;
    }
    return {
        pgSettings,
        rootMutationWrapper: {
            // wrap each validator with a try catch block that transforms a ValidationError to a UserInputError
            ...Object.keys(validators).map(name => ({
                [name]: async (args: any) => {
                    try {
                        await validators[name](args)
                    } catch (err) {
                        if (err instanceof ValidationError) {
                            throw new UserInputError(err.errors.find(_ => true) || 'Validation Error');
                        } else {
                            throw err;
                        }
                    }
                }
            })).reduce(Object.assign)
        }
    }
}