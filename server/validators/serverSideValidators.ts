import { Binding, RegisterInput, UpdatePasswordInput, LoginInput } from "../embeddedGraphql/bindings";
import globalConfig from "../../globalConfig";
import { UserInputError } from "apollo-server-core";
import { RegisterInputShape, UpdatePasswordInputShape, LoginInputShape } from "./validators";

// server side validation
export default (binding: Binding) => ({
    'register': async ({ input }: { input: RegisterInput }): Promise<void> => {
        await RegisterInputShape.validate(input)
        const user = await binding.query.userByEmail({ email: input.email }, undefined, { context: { pgSettings: { role: globalConfig.db.adminUser.name } } });
        if (user) {
            throw new UserInputError("Email already exists");
        }
    },
    'updatePassword': async ({ input }: { input: UpdatePasswordInput}): Promise<void> => {
        await UpdatePasswordInputShape.validate(input)
        if (input.newPassword.length < 6) {
            throw new UserInputError('Password too short');
        }
    },
    'login': async ({ input }: { input: LoginInput }): Promise<void> => {
        await LoginInputShape.validate(input)
    }
})