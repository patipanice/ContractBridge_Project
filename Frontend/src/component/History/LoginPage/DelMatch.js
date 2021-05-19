import React, { useState } from "react";
import EndTime from "../EndTime";
import UpDate from "../UpDate";
import StartTime from "../StartTime";
import Status from "../Status";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function DelMatch(props) {
  const { status } = props;
  function onReset() {
    console.log("Hello " + status._id);
    axios.get(`http://localhost:5000/delete/match/${status._id}`);
  }

  const submit = () => {
    confirmAlert({
      title: "Reset Game",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onReset();
            alert("Click Yes");
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  return (
    <>
      <tr>
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
        <td>
          <p onClick={submit}>delete</p>
        </td>
      </tr>
    </>
  );
}
