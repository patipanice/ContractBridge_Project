import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./component/Home";
import Playing from "./component/Playing/Playing";
import AboutMe from "./component/AboutMe";
import Navbar from "./component/Navbar";
import History from "./component/History/History";
import Dashboard from "./component/History/LoginPage/Dashboard";
import LoginAdmin from "./component/History/LoginPage/LoginAdmin";
import useToken from "./component/History/LoginPage/useToken";

function App() {
  const { token, setToken } = useToken();

  // if (!token) {
  //   return <LoginAdmin setToken={setToken} />;
  // }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/aboutme">
            <AboutMe />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/playing">
            <Playing />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Navbar />

        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
