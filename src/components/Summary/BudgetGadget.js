import React from "react";

/**
 * Display money remaining for this month
 * Input key:
 * 1. 当日预算/共计
 *   budgetToday, budgetTodayTotal
 * 2. 当月预算/共计
 *   budgetMonth, budgetMonthTotal
 * 3. 当月预计存款
 *   savingMonth, incomeMonthTotal
 */
function BudgetGadget({ obj }) {
  return (
    <div className="BudgeGadget">
      {/* 当日预算 */}
      <div>
        <div>今日预算</div>
        <div>
          <div>{obj.budgetToday}</div>
          <div>{obj.budgetTodayTotal}</div>
        </div>
      </div>

      {/* 当月预算 */}
      <div>
        <div>本月预算</div>
        <div>
          <div>{obj.budgetMonth}</div>
          <div>{obj.budgetMonthTotal}</div>
        </div>
      </div>

      {/*  当月预计存款*/}
      <div>
        <div>本月预计存款</div>
        <div>
          <div>{obj.savingMonth}</div>
          <div>{obj.incomeMonthTotal}</div>
        </div>
      </div>
    </div>
  );
}

export default BudgetGadget;
