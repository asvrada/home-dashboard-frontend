import React from "react";

function getNaturalCurrency(amount) {
  amount = Math.abs(amount);
  const strAmount = amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return (
    <div className="amount">
      <span>$</span>
      <span>{strAmount}</span>
    </div>
  );
}

/**
 * Display a single entry of log
 */
function Entry({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  return (
    <div className="Entry row col-10">
      <div className="col-3 text-center word-break">
        <div className="">{node.category.name}</div>
      </div>

      <div className="col-9">
        <div className="row align-items-center">
          <div className="col-7">{amountNatural}</div>

          <div className="col">
            <div>{node.company.name}</div>
            <div>{node.card.name}</div>
          </div>
        </div>

        <div className="word-break">- {node.note}</div>
      </div>
    </div>
  );
}

export default Entry;
