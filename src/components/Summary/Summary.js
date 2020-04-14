import React from "react";

import { useGet } from "restful-react";

import AddEntryGadget from "./AddEntryGadget";
import BudgetGadget from "./BudgetGadget";
import TimeDate from "./TimeDate";

import "./Summary.scss";

/**
 * Display a summary of information at the top of window
 * Information to display:
 *  Days left
 *  Budge left
 *  Stock info
 *  Add new entry
 */
function Summary() {
  // GET summary/
  const { data: objSummary } = useGet({
    path: "summary/",
  });

  // Generate <BudgetGadget>
  let componentBudgetGadget = <span>Loading...</span>;
  if (objSummary !== null) {
    componentBudgetGadget = <BudgetGadget obj={objSummary}/>;
  }

  return (
    <div className="Summary row text-center">
      <div className={"col-md-2"}>
        <TimeDate/>
      </div>

      <div className={"col-md"}>
        {componentBudgetGadget}
      </div>

      <div className={"col-md-1"}>
        <AddEntryGadget/>
      </div>
    </div>
  );
}

export default Summary;
