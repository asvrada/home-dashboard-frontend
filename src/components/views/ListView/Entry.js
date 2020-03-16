import React from "react";

/**
 * Display a single entry of log
 * For example: Used $150 to purchase something
 * Format:
 * {Icon} {Category} {Amount} {Desc}
 */
function Entry({entry}) {
  return (
    <div className="Entry">
      <div>{entry.icon} placeholder</div>
      <div>${entry.amount}</div>
      <div>{entry.category}</div>
      <div>{entry.company}</div>
      <div>{entry.card}</div>
      <div>{entry.note}</div>
      <div>{entry.time}</div>
    </div>
  );
}

export default Entry;
