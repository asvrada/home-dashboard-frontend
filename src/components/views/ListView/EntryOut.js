import React from "react";

import CompanyCard from "./CompanyCard";
import { getNaturalCurrency } from "../../../helpers/Utils";
import Category from "./Category";

/**
 * Display a single entry of log
 */
function EntryOut({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  const componentCategory = <Category node={node}/>;
  const componentCompanyCard = <CompanyCard node={node}/>;
  const componentNote = node.note
    ? (<div className="word-break">- {node.note}</div>)
    : null;

  const componentSeparatorNote = componentNote
    ? (<div className="h-separator"/>) : null;

  return (
    <div className="EntryOut Entry row col align-items-center">
      {componentCategory}

      {/* Detail */}
      <div className="col">
        {/* Amount Company Card*/}
        <div className="row align-items-center">
          <div className="col-7">{amountNatural}</div>
          {componentCompanyCard}
        </div>

        {componentSeparatorNote}
        {componentNote}
      </div>
    </div>
  );
}

export default EntryOut;
