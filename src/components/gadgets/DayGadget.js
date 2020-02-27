import React from "react";

/**
 * Display number of days left in this month
 * Format:
 * {days gone in this month} / {total days in this month} ({percentage passed})
 */
function DayGadget() {
  return (
    <div className="DayGadget">
      <div>10 / 31 (33%)</div>
    </div>
  );
}

export default DayGadget;
