import React from "react";
import { getNaturalCurrency } from "../../../helpers/Utils";

function EntryIn({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  return (
    <div className="EntryIn Entry row col-10 align-items-center">
      <div className="col p-0">
        <div className="row m-0 align-items-center">
          <div className="col p-0">
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alt="icon for company"/>
              <span>{node.company.name}</span>
            </div>
            <div className="row align-items-center m-0">
              <img className="other-icon"
                   src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
                   alr="icon for card"/>
              <span>{node.card.name}</span>
            </div>
          </div>

          <div className="col-7 p-0">{amountNatural}</div>
        </div>

        <div className="h-separator"/>

        <div className="word-break">+ {node.note}</div>
      </div>

      <div className="col-3 p-0 text-center word-break">
        <img className="category-icon"
             src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
             alt="icon for category"/>
        <div className="">
          {node.category.name}
        </div>
      </div>
    </div>
  );
}

export default EntryIn;