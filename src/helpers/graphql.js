import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4444/graphql/",
});

const ALL_TRANSACTIONS = gql`query getBills($cursor: String, $limit: Int) {
  bills(after: $cursor, first: $limit) {
    pageInfo {
      startCursor
      endCursor,
      hasNextPage
    },
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
        note,
        timeCreated
      }
    }
  } 
}`;

export { client, ALL_TRANSACTIONS };