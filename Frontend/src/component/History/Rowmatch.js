import React, { useState } from "react";
import UpTime from "./UpTime";
import UpDate from "./UpDate";
import "./Rowmatch.css";
import ShowMatch from "./ShowMatch";
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
