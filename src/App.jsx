import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import VideoDisplay from "./components/VideoDisplay";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column flex-lg-row">
        <NavBar />

        <div className="d-flex flex-column container-fluid">
          <Switch>
            <Route exact path={"/"}>
              <Home />
            </Route>
            <Route path={"/create"}>
              <RegisterForm />
            </Route>
            <Route path={"/video"}>
              <VideoDisplay />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
