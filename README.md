# Home dashboard Frontend

Powered by React. 

> This is the frontend for home dashboard project, link to backend: https://github.com/asvrada/home-dashboard-backend

### To fetch GraphQL schema
`apollo schema:download --endpoint=http://localhost:4444/graphqltest/ graphql-schema.json`

### To generate Typescript types
`apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/helpers/graphql.ts --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts types`
