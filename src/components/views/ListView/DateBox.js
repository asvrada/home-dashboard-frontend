import React from "react";

function DateBox({ date }) {
  const month = date[1].toString().padStart(2, "0");
  const day = date[2].toString().padStart(2, "0");

  return (
    <div className="d-inline-flex m-1 p-1 date-box">
      {date[0]}-{month}-{day}
    </div>
  );
}

export default DateBox;