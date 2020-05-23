import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@apollo/react-hooks";
import Col from "react-bootstrap/Col";

import { ALL_TRANSACTIONS } from "../../../helpers/graphql";
import { insertDate } from "../../../helpers/utils";
import Entry from "./Entry";
import DateBox from "./DateBox";

function Wrapper({ children }) {
  return (
    <Col className="ListView" xs={4}>
      {children}
    </Col>
  );
}

/**
 * Display a list of most recent transactions
 */
function ListView() {
  const topRef = useRef(null);
  const { loading, error, data, fetchMore } = useQuery(ALL_TRANSACTIONS, {
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
    console.log(error);
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
        <DateBox key={String(node.date)} date={node.date} sum={node.sum}/>
      );
    }

    const isIncome = node.amount > 0;
    return (
      <Entry isIncome={isIncome} key={node.id} node={node}/>
    );
  });

  return (
    <Wrapper>
      <div className="scroll-top"
           onClick={() => topRef.current.scrollIntoView(
             { behavior: "smooth" })}/>

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
        <div key="top" ref={topRef}/>
        {components}
      </InfiniteScroll>
    </Wrapper>
  );
}

export default ListView;
