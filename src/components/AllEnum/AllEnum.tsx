import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { GET_ENUMS_BY_CATEGORY } from '../../helpers/graphql';
import ListItemEnum from './ListItemEnum';

function graphQLResultToArray(data: any) {
  return data.enums.edges.map((each: any) => each.node);
}

enum EnumCategory {
  Category = 'CAT',
  Company = 'COM',
  Card = 'CAR'
}

function AllEnum() {
  const {loading, error, data, fetchMore} = useQuery(GET_ENUMS_BY_CATEGORY, {
    variables: {
      category: EnumCategory.Category,
      limit: 30,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>Errored</h2>;
  }

  const componentEnums = graphQLResultToArray(data).map((each: any) => {
    return (
      <ListItemEnum key={each.id} data={each} />
    );
  });

  return (
    <div>{componentEnums}</div>
  );
}

export default AllEnum;
