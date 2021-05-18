import React from "react";
import "./ShowHandCards.css";
const cardJson = require("../../cards.json");

export default function ShowHandCards(prop) {
  const { inputCardHand, count, onCloseCard } = prop;
  const ShowHandcard = null;

  return (
    <div>
      {" "}
      <div className="content-trump" onClick={onCloseCard}>
        <div className="content-trump-popup-bg">
          <div className="content-trump-popup-use">
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
