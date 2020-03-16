import React from "react";
import Clock from "react-live-clock";

import { getDate, getDay, getMonth } from "../../helpers/TimeDateRelated";

/**
 * Display time and date
 * Format:
 * {time} {day} {month date}
 */
function TimeDate() {
  return (
    <div className="TimeDate">
      <span>{getDay()}</span>
      <span>{getMonth()} / {getDate()}</span>
      <span>
        <Clock format={"HH:mm"} ticking={true} timezone={"US/Pacific"}/>
      </span>
    </div>
  );
}

export default TimeDate;
