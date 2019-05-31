import { makeWrapResolversPlugin } from "graphile-utils";
import { CustomContext } from "server/CustomContext";
import globalConfig from "../../globalConfig";
import { validateSession } from "./validateSession";
import { AuthenticationError } from "apollo-server-core";

export const wrapRootMutationsPlugin = makeWrapResolversPlugin(context => {
    if (context.scope.isRootMutation) {
        return { fieldName: context.scope.fieldName }
    }
    return null;
}, ({ fieldName }) => async (resolver, source, args, context: CustomContext, resolveInfo) => {
    // for mutations, we want to do XSRF validation on the header
    const header = context.req.header(globalConfig.sessionIdHeaderName);
    const session = await validateSession(header, context.req.user && context.req.user.userId)
    if (!session) {
        throw new AuthenticationError("XSRF check failed!");
    }

    if (context.rootMutationWrapper && context.rootMutationWrapper[fieldName]) {
        await context.rootMutationWrapper[fieldName](args);
    }
    const result = await resolver(source, args, context, resolveInfo);
    return result;
})

