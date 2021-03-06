import React, { useState, useEffect } from "react";
import useToken from "./useToken";
import LoginAdmin from "./LoginAdmin";
import DelMatch from "./DelMatch";
import axios from "axios";

export default function Dashboard() {
  const { token, setToken } = useToken();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/status").then((result) => {
      const { data } = result;
      //console.log(data);
      setStatus(data);
    });
  }, []);

  if (!token) {
    return <LoginAdmin setToken={setToken} />;
  }
  return (
    <>
      {" "}
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        x
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Game Match</th>
            <th>Date</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Status</th>
            <th>Delete Match</th>
          </tr>
        </thead>
        <tbody>
          {status.map((match, key) => (
            <DelMatch status={match} key={key} />
          ))}
        </tbody>
      </table>
    </>
  );
}
