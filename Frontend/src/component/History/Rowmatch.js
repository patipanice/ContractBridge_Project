import React, { useState } from "react";
import EndTime from "./EndTime";
import UpDate from "./UpDate";
import StartTime from "./StartTime";
import Status from "./Status";
import "./Rowmatch.css";
import ShowMatch from "./ShowMatch";

export default function Rowmatch(props) {
  const { status } = props;
  const [showMatch, setShowMatch] = useState(false);

  function onClickClose() {
    setShowMatch(false);
  }

  function onClickTR(statusMatch) {
    setShowMatch(statusMatch);
  }

  let showNewmatch = null;
  if (!!showMatch) {
    showNewmatch = (
      <ShowMatch showMatch={showMatch} onClickClose={onClickClose} />
    );
  }
  console.log(status.win_point);
  return (
    <>
      {showNewmatch}
      <tr
        onClick={() => {
          onClickTR(status);
        }}
      >
        <td>Match No. {status._id}</td>
        <td>
          <UpDate inputDate={status.start_date_time} />
        </td>
        <td>
          <StartTime inputStartTime={status.start_date_time} />
        </td>
        <td> :</td>
        <td>{status.win_point.North}</td>
        <td>{status.win_point.East}</td>
        <td>{status.win_point.South}</td>
        <td>{status.win_point.West}</td>
        <td>
          <Status gameRound={status.game_round} />
        </td>
      </tr>
    </>
  );
}
