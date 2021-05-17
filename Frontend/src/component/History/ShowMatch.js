import React, { useState, useEffect } from "react";
import "./ShowMatch.css";
import HistoryField from "./HistoryField";
import SelectRound from "../Playing/SelectRound";
import SelectMatch from "../Playing/SelectMatch";
import axios from "axios";

export default function ShowMatch(prop) {
  const { showMatch } = prop;

  const [cardsData, setCardsData] = useState([
    {
      _id: 1,
      record_card: [
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
      ],
    },
  ]);
  const [round, setRound] = useState(0);
  const [match, setMatch] = useState(0);
  function onChangeRound(round) {
    setRound(round);
  }
  function onChangeMatch(round) {
    setMatch(round);
  }

  useEffect(() => {
    getAllCard().then((res) => {
      if (res.status == "200") {
        console.log("[ Get status server : 200 OK ! ]");
        setCardsData(res.data[showMatch._id - 1]); //when match change useEffect() will run again and again
      }
    });
  }, [match]);

  const getAllCard = async () => {
    const rawCard = await axios.get("http://localhost:5000/card/");
    return rawCard;
  };

  return (
    <div>
      <div className="content-showmatch">
        <div className="content-showmatch-popup-bg">
          <div className="content-showmatch-popup-use"></div>
          <SelectRound onChangeRound={onChangeRound} />
          <SelectMatch onChangeMatch={onChangeMatch} />
          <HistoryField
            status={showMatch}
            cardsData={cardsData}
            round={round}
          />
        </div>
      </div>
    </div>
  );
}
