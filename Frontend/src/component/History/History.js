import React, { useState, useEffect } from "react";
import axios from "axios";
import Rowmatch from "./Rowmatch";

import "./History.css";

export default function History() {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/status").then((result) => {
      const { data } = result;
      setStatus(data);
    });
  }, []);

  return (
    <>
      {" "}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Game Match</th>
            <th>Date</th>
            <th>Time Start</th>
            <th>Score</th>
            <th>North</th>
            <th>East</th>
            <th>South</th>
            <th>West</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {status.map((match, key) => (
            <Rowmatch status={match} key={key} />
          ))}
        </tbody>
      </table>
    </>
  );
}
