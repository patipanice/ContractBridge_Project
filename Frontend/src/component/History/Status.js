import React from "react";

export default function Status(prop) {
  const { gameRound } = prop;
  let status = `${gameRound}/13`;
  if(gameRound=== 13){
    status = "Done"
  }
  return (status);
}
