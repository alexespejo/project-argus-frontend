import React from "react";
import Home from "./pages/Home";
import History from "./pages/History";
import NavBar from "./components/NavBar";
import VideoDisplay from "./components/VideoDisplay";
import UserPage from "./pages/UserPage";
import UploadImagePage from "./pages/UploadImagePage";
import UpdateUsersPage from "./pages/UpdateUsersPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import ManageProfiles from "./pages/ManageProfiles";
import { server } from "./server";

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
        ></div>
        <div className="d-flex flex-column container-fluid">
          <Switch>
            <Route exact path={"/"}>
              <Home date={date} server={server} />
            </Route>
            <Route exact path={"/configure"}>
              <ManageProfiles server={server} />
            </Route>
            <Route path={"/video"}>
              <VideoDisplay server={server} />
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
            <Route exact path={"/history"}>
              <History date={date} />
            </Route>
            <Route exact path={"/cock"}>
              <UpdateUsersPage date={date} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
