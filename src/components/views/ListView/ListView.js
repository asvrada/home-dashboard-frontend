import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_TRANSACTIONS } from "../../../helpers/graphql";
import Entry from "./Entry";

/**
 * Display a list of most recent transactions
 */
function ListView() {
  const { loading, error, data } = useQuery(ALL_TRANSACTIONS);

  console.log(data);

  let component = null;

  if (loading) {
    component = (<div>Loading...</div>);
  }

  if (error) {
    console.log(error);
    component = (<div>An error occurred</div>);
  }

  // Generate list of Entry
  if (!loading) {
    component = data.allBills.edges.map(({ node }) =>
      <li key={node.id}>
        <Entry node={node}/>
      </li>
    );

  }

  return (
    <div className="ListView">
      <ul>
        {component}
      </ul>
    </div>
  );
}

export default ListView;
