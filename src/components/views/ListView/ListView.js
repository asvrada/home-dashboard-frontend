import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@apollo/react-hooks";

import { ALL_TRANSACTIONS } from "../../../helpers/graphql";
import Entry from "./Entry";

function Loading() {
  return <div>Loading...</div>;
}

/**
 * Display a list of most recent transactions
 */
function ListView() {
  const { loading, error, data, fetchMore } = useQuery(ALL_TRANSACTIONS, {
    variables: {
      limit: 10,
    },
  });

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    console.log(error);
    return <div>An error occurred</div>;
  }

  let component = data.bills.edges.map(({ node }) => {
    return (
      <li key={node.id}>
        <Entry node={node}/>
      </li>
    );
  });

  return (
    <div className="ListView">
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          fetchMore({
            variables: {
              cursor: data.bills.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.bills.edges;
              const pageInfo = fetchMoreResult.bills.pageInfo;

              return newEdges.length
                ? {
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  bills: {
                    __typename: previousResult.bills.__typename,
                    edges: [...previousResult.bills.edges, ...newEdges],
                    pageInfo,
                  },
                }
                : previousResult;
            },
          })}
        hasMore={data.bills.pageInfo.hasNextPage}
        loader={<Loading key={"0"}/>}
      >
        <ol>
          {component}
        </ol>
      </InfiniteScroll>
    </div>
  );
}

export default ListView;
