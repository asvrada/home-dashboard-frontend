import React from "react";

function isCurrentYear(year) {
  const currentYear = (new Date()).getFullYear().toString();

  return year.toString() === currentYear;
}

function DateBox({ date }) {
  const month = date[1].toString().padStart(2, "0");
  const day = date[2].toString().padStart(2, "0");

  const componentYear = isCurrentYear(date[0])
    ? null
    : <span>{date[0]}-</span>;

  return (
    <div className="d-inline-flex m-1 p-1 date-box">
      <span>{componentYear}{month}-{day}</span>
    </div>
  );
}

export default DateBox;