import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./component/Home/Home";
import Playing from "./component/Playing/Playing";
import AboutMe from "./component/About/AboutMe";
import Navbar from "./component/Navbar/Navbar";
import History from "./component/History/History";
import Dashboard from "./component/History/LoginPage/Dashboard";
import FindMax from "./component/Playing/FindMax";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/aboutme">
            <AboutMe />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/playing">
            <FindMax />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
