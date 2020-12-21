import React from "react";

function DropdownListRenderValue({item, dataKey, text, callback}: any) {
  if (dataKey === null) {
    return null;
  }

  return (
    <span>
      <span>{text}</span>
      <button onClick={(e) => {
        e.preventDefault();
        callback();
      }}>x</button>
    </span>
  );
}

export default DropdownListRenderValue;
