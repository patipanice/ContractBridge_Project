import React, { useState, useEffect } from "react";
import axios from "axios";
import Rowmatch from "./Rowmatch";
import "./History.css";

export default function History() {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/status").then((result) => {
      const { data } = result;
      //console.log(data);
      setStatus(data);
    });
  }, []);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Game Match</th>
          <th>Date</th>
          <th>Time Start</th>
          <th>Time End</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {status.map((match, key) => (
          <Rowmatch status={match} key={key} />
        ))}
      </tbody>
    </table>
  );
}
