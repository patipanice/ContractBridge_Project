import React, { useState } from "react";

const cardJson = require("../../cards.json");

export default function Fieldcard(props) {
  const { status, cardsData, round } = props;
  //var winRound = cardsData['recording'][round][4].substr(4, 7); //GET WINROUND

  return (
    <>
      <p className="direction south-direction">South</p>
      <p className="direction west-direction">West</p>
      <p className="direction north-direction">North</p>
      <p className="direction east-direction">East</p>
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
      {status["trump"] === "None" ? (
        "GG EZ"
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
    </>
  );
}
