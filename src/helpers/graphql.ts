import ApolloClient, {gql} from "apollo-boost";

enum EnumType {
    Card = "Card",
    Company = "Company",
    Category = "Category",
}

interface IIcon {
    keyword: string,
    path: string
}

interface IEnumCategory {
    category: EnumType,
    name: string,
    icon?: string
}

interface ITransaction {
    amount: number,

    category?: IEnumCategory,
    card?: IEnumCategory,
    company?: IEnumCategory,

    skipSummary?: boolean,

    note?: string,
    timeCreated?: string
}

const DEFAULT_TRANSACTION: ITransaction = {
    amount: 0
};

const client = new ApolloClient({
    uri: "http://127.0.0.1:4444/graphql/",
});

const GET_BILL = gql`query getBill($id: ID!) {
  bill(id: $id) {
    amount,
    category {
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    company{
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    card{
      icon {
        id,
        path,
        keyword
      },
      name,
      category
    },
    note,
    timeCreated
  }
}`;

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

export {client, ALL_TRANSACTIONS, GET_BILL, DEFAULT_TRANSACTION};

// @ts-ignore
export type {EnumType, IIcon, IEnumCategory, ITransaction};
