import React from "react";

import Entry from "./Entry";
import { useGet } from "restful-react";

/**
 * Display a list of most recent transactions
 */
function ListView() {
  // GET bill/
  const { data: listEntries } = useGet({
    path: "bill/",
    resolve: data => {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      return data;
    },
  });

  // Generate list of Entry
  let componentEntries = <span>Loading...</span>;
  if (listEntries !== null) {
    let entries = listEntries.map((entry) =>
      <li key={entry.id}>
        <Entry entry={entry}
        />
      </li>,
    );

    componentEntries = <ul>{entries}</ul>;
  }

  return (
    <div className="ListView">
      {componentEntries}
    </div>
  );
}

export default ListView;
