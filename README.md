This is a starter for an idea that's still evolving

Plan:
1. Migration strategy for a SQL first data model
2. Heavily utilize PostGraphile's powerful capabilities to generate a graphql schema for a business layer API
    * Will use [Custom Queries](https://www.graphile.org/postgraphile/custom-queries/), thoughtful [schema design](https://www.graphile.org/postgraphile/postgresql-schema-design/), [makeExtendSchemaPlugin](https://www.graphile.org/postgraphile/make-extend-schema-plugin/), and [Server Plugins](https://www.graphile.org/postgraphile/plugins/) to achieve this.
3. Use nextjs to perform server side rendering and share logic (e.g. validation, authentication, redirection) cross server/client boundary.
    * Find out the best way to configure .tsconfig for server and next
4. Figure out the best way to organize the validation / authorizatio logic
    * Some will need to live on the database layer, as table constraints, rbac, row level security
    * Some will need to be shared with the UI (using a library like `yup`). Because of the sharing, the logic will need to exist as typescript and should probably be used on HTTP server before being sent to the graphql layer.
    * Some authorization will be too complex to exist on the database side. For example, they could depend on data provided by another remote data source, or require logic too complicated to express easily in sql / procedural postgres language. 
    * Postgraphile's `makeWrapResolversPlugin` can be used to hook into the mutation calls to apply validation logic.
5. File upload???
    * Apollo seems to have a way of doing this
    * Some plugins, like [postgraphile-plugin-upload-field](https://github.com/mattbretl/postgraphile-plugin-upload-field) exemplified in this [github repo](https://github.com/mattbretl/postgraphile-upload-example)
6. Think about use cases where I would want to use [Schema Delegation](https://www.prisma.io/blog/graphql-schema-stitching-explained-schema-delegation-4c6caf468405)


![Architecture](https://i.imgur.com/WybqsCJ.png)
