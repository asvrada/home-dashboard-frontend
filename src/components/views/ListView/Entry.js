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
function Entry({node}) {
  return (
    <div className="Entry">
      <div>{node.category.name}</div>
      <div>${node.amount}</div>

      <div>{node.company.name}</div>
      <div>{node.card.name}</div>
      <div>{node.note}</div>
      <DateTime time={node.timeCreated}/>
    </div>
  );
}

export default Entry;
