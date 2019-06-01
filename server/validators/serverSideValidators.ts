import { Binding, RegisterInput, UpdatePasswordInput } from "server/embeddedGraphql/bindings";
import globalConfig from "../../globalConfig";
import { UserInputError } from "apollo-server-core";
import { RegisterInputShape, UpdatePasswordInputShape } from "./validators";

// server side validation
export default (binding: Binding) => ({
    'register': async ({ input }: { input: RegisterInput }) => {
        await RegisterInputShape.validate(input)
        const user = await binding.query.userByEmail({ email: input.email }, undefined, { context: { pgSettings: { role: globalConfig.db.adminUser.name } } });
        if (user) {
            throw new UserInputError("Email already exists");
        }
    },
    'updatePassword': async ({ input }: { input: UpdatePasswordInput}) => {
        await UpdatePasswordInputShape.validate(input)
        if (input.newPassword.length < 6) {
            throw new UserInputError('Password too short');
        }
    }
})