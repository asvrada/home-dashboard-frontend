# Home dashboard Frontend

> This is the frontend part of the Home Dashboard project  
> Link to backend: https://github.com/asvrada/home-dashboard-backend

Powered by React and Material-UI.

### To Run
```bash
yarn install
# To run dev server
yarn run start
# To build production build
yarn run build
```

## If the backend's GraphQL Schema has changed
### To fetch GraphQL schema
`apollo schema:download --endpoint=http://localhost:4444/graphqltest/ graphql-schema.json`

### To generate Typescript types
`apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/helpers/graphql.ts --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts types`
