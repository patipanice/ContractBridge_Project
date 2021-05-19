import React, { useState, useEffect } from "react";
import "./ShowMatch.css";
import HistoryField from "./HistoryField";
import SelectRound from "./SelectRound";
import "./SelectRound.css";
import SelectMatch from "../Playing/SelectMatch";
import axios from "axios";

export default function ShowMatch(prop) {
  const { showMatch, onClickClose } = prop;
  const [status, setStatus] = useState({
    _id: 1,
    game_match: 1,
    trump: "None",
    game_round: 1,
    first_direction: "South",
  });

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
  function onChangeRound(round) {
    setRound(round);
  }

  useEffect(() => {
    getAllCard().then((res) => {
      if (res.status == "200") {
        console.log("[ Get status server : 200 OK ! ]");
        setCardsData(res.data[showMatch._id - 1]); //when match change useEffect() will run again and again
      }
    });
  }, []);

  const getAllCard = async () => {
    const rawCard = await axios.get("http://localhost:5000/card/");
    return rawCard;
  };

  return (
    <div>
      <div className="content-showmatch">
        <button
          type="button"
          class="btn-close BTN-Close"
          aria-label="Close"
          onClick={onClickClose}
        />
        <div className="content-showmatch-popup-bg">
          <div className="content-showmatch-popup-use">
            <SelectRound
              onChangeRound={onChangeRound}
              statusRound={status.game_round}
              round={cardsData.record_card}
            />

            <HistoryField
              status={showMatch}
              cardsData={cardsData}
              round={round}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
