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
    console.log(showMatch);
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

  return (
    <tr
      onClick={() => {
        onClickTR(status);
      }}
    >
      <td>{status._id}</td>
      <td>
        <UpDate inputDate={status.start_date_time} />
      </td>
      <td>
        <StartTime inputStartTime={status.start_date_time} />
      </td>
      <td>
        <EndTime inputEndTime={status.end_date_time} />
      </td>
      <td>
        <Status gameRound={status.game_round} />
      </td>
      {showNewmatch}
    </tr>
  );
}
