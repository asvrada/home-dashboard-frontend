import React from "react";

/**
 * Display a single entry of log
 * For example: Used $150 to purchase something
 * Format:
 * {Icon} {Category} {Amount} {Desc}
 */
function Entry({icon, category, amount, note}) {
  return (
    <div className="Entry">
      <div>{icon} placeholder</div>
      <div>{category}</div>
      <div>${amount}</div>
      <div>{note}</div>
    </div>
  );
}

export default Entry;
