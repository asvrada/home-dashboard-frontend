import React from "react";
import Clock from "react-live-clock";

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
    <div className="TimeDate row">
      <div id={"day-date"} className={"col-4"}>
        <div id={"day"} className={"col"}>
          {getDay()}
        </div>

        <div className={"w-100"}/>

        <div id={"date"} className={"col"}>
          {month}/{date}
        </div>
      </div>

      <div id={"clock"} className={"col-8"}>
        <Clock format={"HH:mm"} ticking={true} timezone={"US/Pacific"}/>
      </div>
    </div>
  );
}

export default TimeDate;
