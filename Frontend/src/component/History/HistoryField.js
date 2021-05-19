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
      <p className="Directions SD">South</p>
      <p className="Directions WD">West</p>
      <p className="Directions ND">North</p>
      <p className="Directions ED">East</p>
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

      {/* {status["trump"] === "None" ? ("") :  <h1 className="TrumpState"><img src={cardJson[status["trump"].charAt(0)]} alt="trump" className="TrumpImg"/>} */}
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][1]
                : "Back"
            ]
          }
          className="card west-card"
          alt="west-card"
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
          className="card north-card"
          alt="north-card"
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
          className="card east-card"
          alt="east-card"
        />
      }
      {/* {
          <img
            src={
              cardJson[
                cardsData["record_card"]
                  ? cardsData["record_card"][round][4].substr(0, 3)
                  : ""
              ]
            }
            className="winround-card"
          />
        } */}
      <div className="position-trump">
        {status["trump"] === "None" ? (
          ""
        ) : (
          <h2 className="trump_state-HistoryField">
            <img
              src={cardJson[status["trump"].charAt(0)]}
              alt="trump"
              className="trump-img"
            />
            / {status["trump"].charAt(1)}
          </h2>
        )}
      </div>
    </>
  );
}
