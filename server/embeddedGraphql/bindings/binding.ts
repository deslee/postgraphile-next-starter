import { makeBindingClass } from "graphql-binding";
import { BindingConstructor, Binding } from "./generated";
import { GraphQLSchema } from "graphql";

export const getBinding = (schema: GraphQLSchema): Binding => {
    const BindingClass = makeBindingClass<BindingConstructor<Binding>>({ schema })
    return new BindingClass();
}