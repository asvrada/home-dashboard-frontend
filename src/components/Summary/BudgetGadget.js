import React from "react";
import styled from "styled-components";

import { getColor } from "../../helpers/Utils";

const ResizeDiv = styled.div`
    width: ${props => props.textWidth};
    background-color: ${props => props.textColor};
  `;

function Bar(text, current, total) {
  let range = 0;
  if (current >= 0 && total > 0) {
    range = Math.round(current / total * 100);
  }

  // red
  const colorZero = [255, 0, 0];
  // yellow
  const colorMiddle = [255, 255, 0];
  // green
  const colorFull = [0, 255, 0];

  // generate color array
  const colorArray = getColor([
      [0.1, colorZero],
      [0.5, colorMiddle],
      [1, colorFull],
    ],
    range / 100);

  const textWidth = `${range}%`;
  // color array to rgb(x,y,z)
  const textColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

  return (
    <div className={"Bar"}>
      <div className={"text"}>
        {text}
      </div>

      <div className={"bar"}>
        <div className={"bar-text"}>
          <span className={"span-1"}>{current}</span>
          <span className={"span-2"}>/</span>
          <span className={"span-3"}>{total}</span>
        </div>

        {/* overlay bar */}
        <ResizeDiv className={"bar-overlay"}
                   textWidth={textWidth}
                   textColor={textColor}/>

        {/* separator */}
        <div className={"bar-separator bar-separator-1"}/>
        <div className={"bar-separator bar-separator-2"}/>
        <div className={"bar-separator bar-separator-3"}/>

        {/* background bar */}
        <div className={"bar-background"}/>

        {/* Take up space */}
        <div className={"placeholder"}/>
      </div>
    </div>
  );
}

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
  const today = Bar("今日预算", obj.budgetToday, obj.budgetTodayTotal);
  const month = Bar("本月预算", obj.budgetMonth, obj.budgetMonthTotal);
  const saving = Bar("本月剩余", obj.savingMonth, obj.incomeMonthTotal);

  return (
    <div className="BudgeGadget row">
      <div className={"col-md"}>
        {today}
      </div>

      <div className={"col-md"}>
        {month}
      </div>

      <div className={"col-md"}>
        {saving}
      </div>
    </div>
  );
}

export default BudgetGadget;
