import React from "react";

import { useGet } from "restful-react";

import AddEntryGadget from "./AddEntryGadget";
import BudgetGadget from "./BudgetGadget";
import TimeDate from "./TimeDate";

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
    componentBudgetGadget = <BudgetGadget total={objSummary.total}
                                          remainingTotal={objSummary.remainingTotal}
                                          remainingToday={objSummary.remainingToday}/>;
  }

  return (
    <div className="Summary">
      <TimeDate/>

      {componentBudgetGadget}

      {/*<StockGadget/>*/}
      <AddEntryGadget/>
    </div>
  );
}

export default Summary;
