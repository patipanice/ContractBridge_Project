import React, { useState } from "react";
import EndTime from "./EndTime";
import UpDate from "./UpDate";
import StartTime from "./StartTime";
import Status from "./Status";

import "./Rowmatch.css";

import ShowMatch from "./ShowMatch";

export default function Rowmatch(props) {
  const { status } = props;
  const [showMatch, setShowMatch] = useState(null);
  function onClickTR(statusMatch) {
    setShowMatch(statusMatch);
  }
  let showNewmatch = null;
  if (!!showMatch) {
    console.log(showMatch);
    showNewmatch = <ShowMatch showMatch={showMatch} />;
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
