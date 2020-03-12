import React from "react";

/**
 * Display money remaining for this month
 * Format:
 * {budget left in this month} {budget left today} / {Total budget this month}
 */
function BudgetGadget({ total, remainingTotal ,remainingToday}) {

  return (
    <div className="BudgeGadget">
      <div>当月剩余{remainingTotal} (今日剩余{remainingToday}) / {total}</div>
    </div>
  );
}

export default BudgetGadget;
