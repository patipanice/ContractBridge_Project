import React from "react";

const cardJson = require("../../cards.json");

export default function ShowHandCards(prop) {
  const { inputCardHand, count } = prop;
  console.log(count);
  return (
    <div>
      {inputCardHand
        ? inputCardHand.map((val, index) => {
            if (val[0] == "Back") {
              return " ";
            } else {
              return <img src={cardJson[val[count]]} />;
            }
          })
        : ""}
    </div>
  );
}
