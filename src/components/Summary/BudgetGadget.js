import React from "react";
import styled from "styled-components";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getColor } from "../../helpers/utils";

const ResizeDiv = styled.div`
    width: ${props => props.textWidth};
    background-color: ${props => props.textColor};
  `;

function Bar({ text, current, total }) {
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
      <div>
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
                   textColor={textColor} />

        {/* separator */}
        <div className={"bar-separator bar-separator-1"} />
        <div className={"bar-separator bar-separator-2"} />
        <div className={"bar-separator bar-separator-3"} />

        {/* background bar */}
        <div className={"bar-background"} />

        {/* Take up space */}
        <div className={"placeholder"} />
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
  // 今日预算
  const today = <Bar text={"Budget Today"}
                     current={obj.budgetToday}
                     total={obj.budgetTodayTotal} />;
  // 本月预算
  const month = <Bar text={"Budget Month"}
                     current={obj.budgetMonth}
                     total={obj.budgetMonthTotal} />;
  // 本月存款
  const saving = <Bar text={"Saving End of Month"}
                      current={obj.savingMonth}
                      total={obj.incomeMonthTotal} />;

  return (
    <Row className="BudgeGadget">
      <Col md>
        {today}
      </Col>

      <Col md>
        {month}
      </Col>

      <Col md>
        {saving}
      </Col>
    </Row>
  );
}

export default BudgetGadget;
