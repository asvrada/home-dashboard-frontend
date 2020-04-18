import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_TRANSACTIONS } from "../../../helpers/graphql";

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
  // let componentEntries = <span>Loading...</span>;
  // if (listEntries !== null) {
  //   let entries = listEntries.map((entry) =>
  //     <li key={entry.id}>
  //       <Entry entry={entry}
  //       />
  //     </li>,
  //   );
  //
  //   componentEntries = <ul>{entries}</ul>;
  // }

  return (
    <div className="ListView">
      {component}
    </div>
  );
}

export default ListView;
