import React, { useState, useEffect } from "react";
import axios from "axios";
import Fieldcard from "./Fieldcards";
import SelectRound from "./SelectRound";
import SelectMatch from "./SelectMatch";
import HandCards from "./HandCards";
import "./Fieldcards.css";
const cardJson = require("../JSONFile/card.json");

export default function Playing() {
  const [cardsData, setCardsData] = useState(cardJson);
  const [status, setStatus] = useState({
    _id: 1,
    game_match: 1,
    trump: "None",
    game_round: 1,
    first_direction: "South",
  });
  const [round, setRound] = useState(0);
  const [match, setMatch] = useState(0);

  useEffect(() => {
    getAllCard().then((res) => {
      if (res.status == "200") {
        console.log("[ Get card server : 200 OK ! ]");
        setCardsData(res.data[match]); //when match change useEffect() will run again and again
      }
    });
    getStatus().then((res) => {
      if (res.status == "200") {
        console.log("[ Get status server : 200 OK ! ]");
        setStatus(res.data[match]); //when match change useEffect() will run again and again
      }
    });
  }, [match]);

  const getAllCard = async () => {
    return await axios.get("http://localhost:5000/card/");
  };

  const getStatus = async () => {
    return await axios.get("http://localhost:5000/status/");
  };

  const onChangeRound = (round) => {
    setRound(round);
  };
  const onChangeMatch = (round) => {
    setMatch(round);
  };

  // const SelectRoundPlay = cardsData.map((cardsData, index) => {
  //   return (
  //     <SelectMatch
  //       round={cardsData}
  //       key={index}
  //       onChangeMatch={onChangeMatch}
  //     />
  //   );
  // });

  return (
    <>
      <div className="content-fieldcards">
        <HandCards record_card={cardsData.record_card} />
        <SelectRound
          onChangeRound={onChangeRound}
          statusRound={status.game_round}
          round={cardsData.record_card}
        />
        {/* <SelectMatch onChangeMatch={onChangeMatch} /> */}

        <Fieldcard status={status} cardsData={cardsData} round={round} />
      </div>
    </>
  );
}
