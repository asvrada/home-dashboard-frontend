import React from "react";

function DateTime({time}) {
  console.log(time);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate().toString().padStart(2, '0');
  const hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, '0');

  const str = `${hour}:${minute} ${month}/${date}/${year}`;

  return (
    <div>{str}</div>
  );
}

/**
 * Display a single entry of log
 */
function Entry({entry}) {
  return (
    <div className="Entry">
      <div>{entry.icon}</div>
      <div>${entry.amount}</div>
      <div>{entry.category}</div>
      <div>{entry.company}</div>
      <div>{entry.card}</div>
      <div>{entry.note}</div>
      <DateTime time={new Date (entry.time)} />
    </div>
  );
}

export default Entry;
