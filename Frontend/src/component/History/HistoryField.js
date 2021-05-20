import React, { useState } from "react";
import "./HistoryField.css";
import ShowHandCard from "../Playing/ShowHandCards";

const cardJson = require("../../cards.json");

export default function Fieldcard(props) {
  const { status, cardsData, round } = props;
  const [showCard, setShowCard] = useState(false);
  const [countCard, setCountCard] = useState(null);

  function onChangeinput() {
    setShowCard(cardsData["record_card"]);
  }

  const changeRound = (event) => {
    setCountCard(event.target.value);
    onChangeinput();
  };
  function onCloseCard() {
    setShowCard(false);
  }
  let showHand = null;
  if (!!showCard) {
    showHand = (
      <ShowHandCard
        inputCardHand={showCard}
        count={countCard}
        onCloseCard={onCloseCard}
      />
    );
  }

  return (
    <>
      {showHand}
      <form>
        <label className="HandLabel">Show Hand : </label>
        <select
          name="rounds"
          id="rounds"
          onChange={changeRound}
          className="OptionHand"
        >
          <option value="None">None</option>
          <option value="2">North</option>
          <option value="3">East</option>
          <option value="0">South</option>
          <option value="1">West</option>
        </select>
      </form>
      <p className="Directions SD">
        {" "}
        South : {status["win_point"] ? status["win_point"]["South"] : 0}
      </p>
      <p className="Directions WD">
        {" "}
        West : {status["win_point"] ? status["win_point"]["West"] : 0}{" "}
      </p>
      <p className="Directions ND">
        {" "}
        North : {status["win_point"] ? status["win_point"]["North"] : 0}
      </p>
      <p className="Directions ED">
        {" "}
        East : {status["win_point"] ? status["win_point"]["East"] : 0}
      </p>
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][0]
                : "Back"
            ]
          }
          className="Cards SouthCard"
          alt="SouthCard"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][1]
                : "Back"
            ]
          }
          className="Cards WestCard"
          alt="WestCard"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][2]
                : "Back"
            ]
          }
          className="Cards NorthCard"
          alt="NorthCard"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][3]
                : "Back"
            ]
          }
          className="Cards EastCard"
          alt="EastCard"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][4].substr(0, 3)
                : ""
            ]
          }
          className="Cards WIND "
        />
      }

      {status["trump"] === "None" ? (
        ""
      ) : (
        <h1 className="TrumpState">
          <img
            src={cardJson[status["trump"].charAt(0)]}
            alt="trump"
            className="TrumpImg"
          />
          / {status["trump"].charAt(1)}
        </h1>
      )}
    </>
  );
}
