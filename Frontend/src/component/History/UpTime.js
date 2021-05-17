import React from "react";

export default function update(prop) {
  const { inputTime } = prop;
  let date = new Date(inputTime);
  let today = date.toLocaleString();
  let time = today;
  if (time !== "Invalid Date") {
    let Time = today.substr(11);
    return Time;
  }

  return ( <></>)
}
