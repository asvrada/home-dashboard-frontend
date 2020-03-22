import React from "react";

function DateTime({ time }) {
  const objDatetime = new Date(time);

  const year = objDatetime.getFullYear();
  const month = objDatetime.getMonth() + 1;
  const date = objDatetime.getDate().toString().padStart(2, "0");
  const hour = objDatetime.getHours();
  const minute = objDatetime.getMinutes().toString().padStart(2, "0");

  const str = `${hour}:${minute} ${month}/${date}/${year}`;

  return (
    <div>{str}</div>
  );
}

/**
 * Display a single entry of log
 */
function Entry({ entry }) {
  return (
    <div className="Entry">
      <div>{entry.icon}</div>
      <div>${entry.amount}</div>
      <div>{entry.category}</div>
      <div>{entry.company}</div>
      <div>{entry.card}</div>
      <div>{entry.note}</div>
      <DateTime time={entry.time_created}/>
    </div>
  );
}

export default Entry;
