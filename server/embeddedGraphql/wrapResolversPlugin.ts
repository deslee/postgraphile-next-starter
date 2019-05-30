import { makeWrapResolversPlugin } from "graphile-utils";

export const wrapRootMutationsPlugin = makeWrapResolversPlugin(context => {
    if (context.scope.isRootMutation) {
        return { fieldName: context.scope.fieldName }
    }
    return null;
}, ({ fieldName }) => async (resolver, source, args, context, resolveInfo) => {
    if (context.rootMutationWrapper && context.rootMutationWrapper[fieldName]) {
        await context.rootMutationWrapper[fieldName](args);
    }
    const result = await resolver(source, args, context, resolveInfo);
    return result;
})

