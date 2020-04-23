import React from "react";
import { getNaturalCurrency } from "../../../helpers/Utils";

function EntryIn({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  return (
    <div className="EntryIn Entry row col align-items-center">
      {/* Detail */}
      <div className="col">
        {/* Amount Company Card */}
        <div className="row align-items-center">
          <div className="col p-0">
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alt="icon for company"/>
              <span>{node.company && node.company.name}</span>
            </div>
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alt="icon for card"/>
              <span>{node.card && node.card.name}</span>
            </div>
          </div>

          <div className="col-7">{amountNatural}</div>
        </div>

        <div className="h-separator"/>

        {/* Note */}
        <div className="word-break">+ {node.note}</div>
      </div>

      {/* Category */}
      <div className="col-3 p-0 text-center word-break">
        <img className="category-icon"
             src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
             alt="icon for category"/>
        <div className="category-name">
          {node.category.name}
        </div>
      </div>
    </div>
  );
}

export default EntryIn;