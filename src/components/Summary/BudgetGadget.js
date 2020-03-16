import React from "react";

/**
 * Display money remaining for this month
 * Format:
 * {budget left in this month} {budget left today} / {Total budget this month}
 */
function BudgetGadget({ total, remainingTotal, remainingToday }) {
  let componentDisplay = null;
  // overdrawn
  if (total <= 0) {
    componentDisplay = <div>当月超支{total}</div>;
  } else {
    componentDisplay =
      <div>当月剩余{remainingTotal} (今日剩余{remainingToday}) / {total}</div>;
  }

  return (
    <div className="BudgeGadget">
      {componentDisplay}
    </div>
  );
}

export default BudgetGadget;
