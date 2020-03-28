import React from "react";

/**
 * Display money remaining for this month
 * Format:
 * {budget left in this month} {budget left today} / {Total budget this month}
 */
function BudgetGadget({ input }) {
  let componentDisplay = null;
  // overdrawn
  if (input.total <= 0) {
    componentDisplay = <div>当月超支{input.total}</div>;
  } else {
    componentDisplay =
      <div>当月剩余{input.budgetTotal} (今日剩余{input.budgetToday}) / {input.total}</div>;
  }

  return (
    <div className="BudgeGadget">
      {componentDisplay}
    </div>
  );
}

export default BudgetGadget;
