import React from "react";
import "./SelectRound.css";
export default function SelectRound(props) {
  const { cardsData, round } = props;

  const changeRound = (event) => {
    props.onChangeRound(event.target.value);
  };

  return (
    <div className="grid-select">
      <form>
        <label className="LableRound">Select Round : </label>
        <select name="rounds" id="rounds" onChange={changeRound}  className="option-roundsHistory" >
          {round
            ? round.map((val, index) => {
                return (
                  <option key={index} value={index} className="option">
                    {index}
                  </option>
                );
              })
            : ""}
        </select>
      </form>
    </div>
  );
}
