import React from "react";

export default function StartTime(prop) {
  const { inputStartTime } = prop;
  let date = new Date(inputStartTime);
  let today = date.toLocaleString();
  let Time = today.substr(11);
  let TimeStart;
  if (Time !== "Invalid Date") {
    TimeStart = today.substr(11);
    return TimeStart;
  }

  return (TimeStart);
}
