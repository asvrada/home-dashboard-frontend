import { useQuery } from "@apollo/react-hooks";
import { Box, Grid, Paper } from "@material-ui/core";
import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { GET_TRANSACTIONS } from "../../../helpers/graphql";
import { insertDate } from "../../../helpers/utils";
import DateBox from "./DateBox";
import Entry from "./Entry";

function ListView() {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: 10,
    },
  });

  if (loading) {
    return <Paper>
      <div>Loading...</div>
    </Paper>;
  }

  if (error) {
    return <Paper>
      <div>An error occurred</div>
    </Paper>;
  }

  // todo
  const components = data.bills.edges.map((node) => {
    node = node.node;
    const isIncome = node.amount > 0;
    return (
      <Grid item xs={12} key={node.id}>
        <Entry isIncome={isIncome} key={node.id} node={node} />
      </Grid>
    );
  });

  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={1}>
          {components}
        </Grid>
      </Box>
    </Paper>
  );
}

function Wrapper({ children }) {
  return (
    <Box className="ListView" xs={4}>
      {children}
    </Box>
  );
}

/**
 * Display a list of most recent transactions
 */
function OldListView() {
  const topRef = useRef(null);
  const { loading, error, data, fetchMore } = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: 30,
    },
  });

  if (loading) {
    return <Wrapper>
      <div className="Entry text-center">Loading...</div>
    </Wrapper>;
  }

  if (error) {
    console.log("ListView Error");
    return <Wrapper>
      <div className="Entry text-center">An error occurred</div>
    </Wrapper>;
  }

  ////////////////
  // Main Logic //
  ////////////////
  const edges = insertDate(data.bills.edges);

  const components = edges.map((node) => {
    if (node.hasOwnProperty("type")) {
      return (
        <DateBox key={String(node.date)} date={node.date} sum={node.sum} />
      );
    }

    const isIncome = node.amount > 0;
    return (
      <Entry isIncome={isIncome} key={node.id} node={node} />
    );
  });

  return (
    <Wrapper>
      <div className="scroll-top"
           onClick={() => topRef.current.scrollIntoView(
             { behavior: "smooth" })} />

      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchMore({
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
        loader={<div className="Entry text-center"
                     key="loading">Loading...</div>}
        useWindow={false}
      >
        <div key="top" ref={topRef} />
        {components}
      </InfiniteScroll>
    </Wrapper>
  );
}

export default ListView;
