import React from "react";
import { getNaturalCurrency } from "../../../helpers/Utils";

/**
 * Display a single entry of log
 */
function EntryOut({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  return (
    <div className="EntryOut Entry row col align-items-center">
      {/* Category */}
      <div className="col-3 p-0 text-center word-break">
        <img className="category-icon"
             src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
             alt="icon for category"/>
        <div className="category-name">
          {node.category.name}
        </div>
      </div>

      {/* Detail */}
      <div className="col">
        {/* Amount Company Card*/}
        <div className="row align-items-center">
          <div className="col-7">{amountNatural}</div>

          <div className="col p-0">
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alt="icon for company"/>
              <span>{node.company && node.company.name}</span>
            </div>
            <div className="h-separator"/>
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alt="icon for card"/>
              <span>{node.card && node.card.name}</span>
            </div>
          </div>
        </div>

        <div className="h-separator"/>

        {/* note */}
        <div className="word-break">- {node.note}</div>
      </div>
    </div>
  );
}

export default EntryOut;
