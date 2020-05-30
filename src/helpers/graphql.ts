import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4444/graphql/",
});

///////////
// Query //
///////////
const GET_ENUMS = gql`query getEnums {
  enums {
    edges {
      node {
        id,
        name,
        category,
        icon {
          id
        }
      }
    }
  }
}`;

const GET_BILL = gql`query getBill($id: ID!) {
  bill(id: $id) {
    id,
    amount,
    category {
      id,
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    company{
      id,
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    card{
      id,
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    note,
    creator {
      id
    },
    skipSummaryFlag,
    timeCreated
  }
}`;

const GET_TRANSACTIONS = gql`query getBills($cursor: String, $limit: Int) {
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
        creator {
          id
        },
        skipSummaryFlag,
        timeCreated
      }
    }
  } 
}`;

//////////////
// Mutation //
//////////////
const CREATE_TRANSACTION = gql`
mutation createTransaction($input:CreateTransactionInput!) {
  createTransaction(input: $input) {
    transaction {
      id,
      amount,
      category {
        id,
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      company {
        id, 
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      card {
        id,
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      skipSummaryFlag,
      creator {
        id
      }
      note,
      timeCreated
    }
  }
}`;

const UPDATE_TRANSACTION = gql`
mutation updateTransaction($input:UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    transaction {
      id,
      amount,
      category {
        id,
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      company {
        id, 
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      card {
        id,
        name,
        category,
        icon {
          id,
          keyword,
          path
        }
      },
      skipSummaryFlag,
      creator {
        id
      }
      note,
      timeCreated
    }
  }
}
`;

const DELETE = gql`
mutation deleteObj($id: ID!) {
  deleteObj(input: {
    id: $id
  }) {
    ok
  }
}
`;

export {
  client,
  GET_TRANSACTIONS, GET_BILL, GET_ENUMS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE
};
