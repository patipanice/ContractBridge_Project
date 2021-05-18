import React, { useState } from "react";
import WinAuctionTrump from "./trump/WinAuctionTrump";
import "./Fieldcards.css";
import ShowHandCard from "./ShowHandCards";
const cardJson = require("../../cards.json");

export default function Fieldcard(props) {
  const { status, cardsData, round } = props;
  //var winRound = cardsData['recording'][round][4].substr(4, 7); //GET WINROUND
  const [popupTrump, setPopupTrump] = useState(false);
  const [countCard, setCountCard] = useState(null);
  const [showCard, setShowCard] = useState(null);
  let trumpPopUp;

  const popUpTrumpOpenHandler = () => setPopupTrump(true);
  const popUpTrumpCloseHandler = () => setPopupTrump(false);

  if (popupTrump) {
    trumpPopUp = <WinAuctionTrump onTrumpClose={popUpTrumpCloseHandler} />;
  }
  function onChangeinput() {
    setShowCard(cardsData["record_card"]);
  }
  const changeRound = (event) => {
    setCountCard(event.target.value);
    onChangeinput();
  };

  let showHand = null;
  if (!!showCard) {
    showHand = <ShowHandCard inputCardHand={showCard} count={countCard} />;
  }

  return (
    <div>
      <form>
        <label>Show Hand : </label>
        <select
          name="rounds"
          id="rounds"
          onChange={changeRound}
          className="option-rounds"
        >
          <option value="None">None</option>
          <option value="2">North</option>
          <option value="3">East</option>
          <option value="0">South</option>
          <option value="1">West</option>
        </select>
      </form>
      {showHand}
      <p className="direction south-direction">
        South : {status["win_point"] ? status["win_point"]["South"] : 0}
      </p>
      <p className="direction west-direction">
        West : {status["win_point"] ? status["win_point"]["West"] : 0}
      </p>
      <p className="direction north-direction">
        North : {status["win_point"] ? status["win_point"]["North"] : 0}
      </p>
      <p className="direction east-direction">
        East : {status["win_point"] ? status["win_point"]["East"] : 0}
      </p>
      <p className="direction win-direction">
        {/* {cardsData["record_card"][round][4]} */}
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
          className="card south-card"
          alt="south-card"
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
      {
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
      }
      {trumpPopUp}
      {status["trump"] === "None" ? (
        <button className="btn-trump" onClick={popUpTrumpOpenHandler}>
          Trump
        </button>
      ) : (
        <h1 className="trump_state">
          <img
            src={cardJson[status["trump"].charAt(0)]}
            alt="trump"
            className="trump-img"
          />
          / {status["trump"].charAt(1)}
        </h1>
      )}
    </div>
  );
}
