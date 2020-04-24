import React from "react";

import CompanyCard from "./CompanyCard";
import { getNaturalCurrency } from "../../../helpers/Utils";
import Category from "./Category";

function EntryIn({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  const componentCategory = Category({ node });
  const componentCompanyCard = CompanyCard({ node });
  const componentNote = node.note
    ? (<div className="word-break">- {node.note}</div>)
    : null;
  const componentSeparatorNote = componentNote
    ? (<div className="h-separator"/>) : null;

  return (
    <div className="EntryIn Entry row col align-items-center">
      {/* Detail */}
      <div className="col">
        {/* Amount Company Card */}
        <div className="row align-items-center">
          {componentCompanyCard}
          <div className="col-7">{amountNatural}</div>
        </div>

        {componentSeparatorNote}
        {componentNote}
      </div>

      {componentCategory}
    </div>
  );
}

export default EntryIn;