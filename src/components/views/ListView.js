import React from "react";

import Entry from "../Entry";
import { useGet } from "restful-react";

/**
 * Display a list of most recent transactions
 */
function ListView() {
  // GET bill/
  const { data: objEntries } = useGet({
    path: "bill/",
  });

  // Generate list of Entry
  let componentEntries = <span>Loading...</span>;
  if (objEntries !== null) {
    let listEntries = objEntries.map((entry) =>
      <li key={entry.id}>
        <Entry icon={"NONE"}
               amount={entry.amount}
               category={entry.category}
               note={entry.note}/>
      </li>,
    );

    componentEntries = <ul>{listEntries}</ul>;
  }

  return (
    <div className="ListView">
      {componentEntries}
    </div>
  );
}

export default ListView;
