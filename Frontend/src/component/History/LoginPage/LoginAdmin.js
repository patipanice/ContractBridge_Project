import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./LoginAdmin.css";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return axios
    .post("http://localhost:5000/login", {
      username: credentials.username,
      password: credentials.password,
    })
    .then((res) => res.data.token);
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log(`token : ${token}`);
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1 className="header-login">Login</h1>
      <form onSubmit={handleSubmit} className="formflex">  
          <label className="label">Username</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} required />
          <label  className="label">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btns">Submit</button>
      </form>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
