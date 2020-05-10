import React from "react";
import Clock from "react-live-clock";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getDate, getDay, getMonth } from "../../helpers/TimeDateRelated";

/**
 * Display time and date
 * Format:
 * {time} {day} {month date}
 */
function TimeDate() {
  const month = getMonth().toString();
  const date = getDate().toString();
  return (
    <Row className="TimeDate">
      <Col id="day-date" xs={4}>
        <Col id="day">
          {getDay()}
        </Col>

        <div className={"w-100"}/>

        <Col id="date">
          {month}/{date}
        </Col>
      </Col>

      <Col id="clock" xs={8}>
        <Clock format={"HH:mm"} ticking={true} timezone={"US/Pacific"}/>
      </Col>
    </Row>
  );
}

export default TimeDate;
