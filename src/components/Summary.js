import React from "react";

import AddEntryGadget from "./gadgets/AddEntryGadget";
import BudgeGadget from "./gadgets/BudgeGadget";
import DayGadget from "./gadgets/DayGadget";
import StockGadget from "./gadgets/StockGadget";

/**
 * Display a summary of information at the top of window
 * Information to display:
 *  Days left
 *  Budge left
 *  Stock info
 *  Add new entry
 */
function Summary() {
  return (
    <div className="Summary">
      <DayGadget/>
      <BudgeGadget/>
      <StockGadget/>
      <AddEntryGadget/>
    </div>
  );
}

export default Summary;
