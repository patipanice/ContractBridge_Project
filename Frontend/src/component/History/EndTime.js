import React from "react";

export default function EndTime(prop) {
  const { inputEndTime } = prop;
  let date = new Date(inputEndTime);
  let today = date.toLocaleString();
  let Time = today.substr(11);
  let endTime;
  if (Time !== "Invalid Date") {
    endTime = today.substr(11);
    return endTime;
  }

  return (endTime);
}
