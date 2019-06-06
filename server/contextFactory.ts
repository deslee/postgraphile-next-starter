import validatorFactory from './validators/serverSideValidators';
import { UserInputError } from 'apollo-server-core';
import { ValidationError } from 'yup';
import { CustomRequest, CustomResponse } from './CustomRequestResponse';
import { CustomContext } from './CustomContext';

export default (req: CustomRequest, res: CustomResponse): CustomContext => {
    const validators = validatorFactory(req.binding);
    const pgSettings: {'claims.userId'?: string, 'claims.sessionId'?: string} = {};
    if (req.user) {
        pgSettings['claims.userId'] = req.user.userId;
        pgSettings['claims.sessionId'] = req.user.sessionId;
    }
    return {
        req, res,
        pgSettings,
        rootMutationWrapper: {
            // wrap each validator with a try catch block that transforms a ValidationError to a UserInputError
            ...Object.keys(validators).map(name => ({
                [name]: async (args: any) => {
                    try {
                        await validators[name as keyof typeof validators](args)
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