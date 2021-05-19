import React from "react";
import "./ShowHandCards.css";
const cardJson = require("../../cards.json");

export default function ShowHandCards(prop) {
  const { inputCardHand, count, onCloseCard } = prop;

  return (
    <div>
      {" "}
      <div className="content-hand" onClick={onCloseCard}>
        <div className="content-hand-popup-bg">
          <div className="content-hand-popup-use">
            {inputCardHand
              ? inputCardHand.map((val, index) => {
                  if (val[0] == "Back" || count == "None") {
                    return;
                  } else {
                    return <img src={cardJson[val[count]]} />;
                  }
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
