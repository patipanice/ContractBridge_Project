import React, { useState } from "react";
import EndTime from "./EndTime";
import UpDate from "./UpDate";
import StartTime from "./StartTime"
import Status from './Status'
import "./Rowmatch.css";

export default function Rowmatch(props) {
  const {status} = props
  return (
 <tr>
   <td>{status._id}</td>
   <td><UpDate inputDate={status.start_date_time}/></td>
   <td><StartTime inputStartTime={status.start_date_time}/></td>
   <td><EndTime inputEndTime={status.end_date_time}/></td>
   <td><Status gameRound={status.game_round}/></td>
 </tr>
  )

  }
