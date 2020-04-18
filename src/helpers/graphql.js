import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4444/graphql/",
});

const ALL_TRANSACTIONS = gql`query getAllTransaction {
  allBills {
    edges {
      node {
        id,
        amount,
        category {
          name,
          icon {
            keyword
          }
        },
        company {
          name,
          icon {
            keyword
          }
        },
        card {
          name,
          icon {
            keyword
          }
        },
        note
      }
    }
  } 
}`;

export { client, ALL_TRANSACTIONS };