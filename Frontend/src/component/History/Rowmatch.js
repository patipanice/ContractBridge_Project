import React, { useState } from "react";
import UpTime from "./UpTime";
import UpDate from "./UpDate";
import "./Rowmatch.css";
import ShowMatch from "./ShowMatch";

export default function Rowmatch(props) {
  const { status } = props;
  const [count, setCount] = useState(0);
  const [showMatch, setShowMacth] = useState(null);

  function onClickTR(statusMatch) {
    setShowMacth(statusMatch);
  }
  let showNewmatch = null;
  if (!!showMatch) {
    console.log(showMatch);
    showNewmatch = <ShowMatch showMatch={showMatch} />;
  }
  return (
    <div>
      {showNewmatch}
      <table className="table-history">
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Time Start</th>
          <th>Time End</th>
          <th>Status</th>
        </tr>
        <tr
          onClick={() => {
            onClickTR(status[0] && status[0]);
          }}
        >
          <td>Match {status[0] ? status[0]._id : ""}</td>
          <td>
            <UpDate inputDate={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].end_date_time : ""} />
          </td>
          <td></td>
        </tr>
        <tr
          onClick={() => {
            onClickTR(status[1] && status[1]);
          }}
        >
          <td>Match {status[1] ? status[1]._id : ""}</td>
          <td>
            <UpDate inputDate={status[1] ? status[1].start_date_time : " "} />
          </td>
          <td>
            <UpTime inputTime={status[1] ? status[1].start_date_time : " "} />
          </td>
          <td>
            <UpTime inputTime={status[1] ? status[1].end_date_time : " "} />
          </td>
          <td></td>
        </tr>
        <tr
          onClick={() => {
            onClickTR(status[2] && status[2]);
          }}
        >
          <td>Match {status[2] ? status[2]._id : ""}</td>
          <td>
            <UpDate inputDate={status[2] ? status[2].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[2] ? status[2].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[2] ? status[2].end_date_time : ""} />
          </td>
          <td></td>
        </tr>
        <tr
          onClick={() => {
            onClickTR(status[0] && status[0]);
          }}
        >
          <td>Match {status[0] ? status[0]._id : ""}</td>
          <td>
            <UpDate inputDate={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].end_date_time : ""} />
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}
