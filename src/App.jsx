import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import VideoDisplay from "./components/VideoDisplay";
import UserPage from "./pages/UserPage";
import UploadImagePage from "./pages/UploadImagePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import ManageProfiles from "./pages/ManageProfiles";
import Key from "./components/Key";
const date = new Date();

function App() {
  return (
    <Router>
      <div className="d-flex flex-column flex-lg-row">
        <NavBar />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
          }}
        >
          <Key />
        </div>
        <div className="d-flex flex-column container-fluid">
          <Switch>
            <Route exact path={"/"}>
              <Home date={date} />
            </Route>
            <Route exact path={"/configure"}>
              <ManageProfiles />
            </Route>
            <Route path={"/video"}>
              <VideoDisplay />
            </Route>
            <Route exact path={"/profiles/"}>
              <ProfilesPage date={date} />
            </Route>
            <Route exact path={"/profiles/:id"}>
              <UserPage date={date} />
            </Route>
            <Route exact path={"/upload"}>
              <UploadImagePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
