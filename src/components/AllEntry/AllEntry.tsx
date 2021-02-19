import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { GET_TRANSACTIONS } from '../../helpers/graphql';
import { getBills } from '../../helpers/types/getBills';
import { insertDate } from '../../helpers/utils';

import DateBox from '../Index/RecentBill/DateBox';
import Entry from '../Index/RecentBill/Entry';


function AllEntry() {
  const {loading, error, data, fetchMore} = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: 30,
    },
  });

  if (loading) {
    return <div className="Entry text-center">Loading...</div>;
  }

  if (error) {
    console.log('ListView Error');
    return <div className="Entry text-center">An error occurred</div>;
  }

  ////////////////
  // Main Logic //
  ////////////////
  const edges = insertDate(data.bills.edges);

  const components = edges.map((node) => {
    if (node.isMetadata) {
      return (
        <DateBox key={String(node.date)} date={node.date} sum={node.sum} />
      );
    }

    return (
      <Box key={node.id} mb={1}>
        <Entry bill={node} />
      </Box>
    );
  });

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchMore({
          variables: {
            cursor: data.bills.pageInfo.endCursor,
          },
          updateQuery: (previousQueryResultUnknown, {fetchMoreResult}) => {
            const previousResult = previousQueryResultUnknown as getBills;
            const moreResult = fetchMoreResult as getBills;
            const newEdges = moreResult.bills!.edges;
            const pageInfo = moreResult.bills!.pageInfo;

            return newEdges.length
              ? {
                // Put the new comments at the end of the list and update `pageInfo`
                // so we have the new `endCursor` and `hasNextPage` values
                bills: {
                  __typename: previousResult.bills?.__typename,
                  edges: [...previousResult.bills!.edges, ...newEdges],
                  pageInfo: {
                    ...previousResult.bills?.pageInfo,
                    endCursor: pageInfo.endCursor,
                    hasNextPage: pageInfo.hasNextPage
                  },
                },
              }
              : previousResult;
          },
        })}
        hasMore={data.bills.pageInfo.hasNextPage}
        loader={<div key="loading">Loading...</div>}
      >
        {components}
      </InfiniteScroll>
    </div>
  );
}

export default AllEntry;