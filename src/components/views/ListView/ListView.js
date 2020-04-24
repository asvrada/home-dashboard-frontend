import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@apollo/react-hooks";

import { ALL_TRANSACTIONS } from "../../../helpers/graphql";
import { insertDate } from "../../../helpers/Utils";
import EntryOut from "./EntryOut";
import EntryIn from "./EntryIn";
import DateBox from "./DateBox";

function Loading() {
  return <div className="Entry">Loading...</div>;
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

  const edges = insertDate(data.bills.edges);

  let component = edges.map((node) => {
    if (Array.isArray(node)) {
      return (
        <DateBox key={String(node)} date={node}/>
      );
    }

    const isIncome = node.amount > 0;
    if (isIncome) {
      return (
        <div className="row" key={node.id}>
          <EntryIn node={node}/>
        </div>
      );
    } else {
      return (
        <div className="row" key={node.id}>
          <EntryOut node={node}/>
        </div>
      );
    }
  });

  return (
    <div className="ListView col-md-4">
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
        useWindow={false}
      >
        {component}
      </InfiniteScroll>
    </div>
  );
}

export default ListView;
