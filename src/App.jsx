import React from "react";
import { useState, useEffect } from "react";
import { db } from "./argus-config";
import { collection, getDocs } from "firebase/firestore";
import Home from "./pages/Home";
import History from "./pages/History";
import NavBar from "./components/NavBar";
import VideoDisplay from "./components/VideoDisplay";
import UserPage from "./pages/UserPage";
import UploadImagePage from "./pages/UploadImagePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import ManageProfiles from "./pages/ManageProfiles";
import { server } from "./server";
import ProfileDisplay from "./components/ProfileDisplay";
import Settings from "./pages/Settings";
const date = new Date();

function App() {
  const [loginMember, setLoginMember] = useState(null);
  const [members, setMembers] = useState([]);
  const usersCollectionRef = collection(db, "members");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <Router>
      <div className={`d-flex flex-column flex-lg-row`}>
        <NavBar server={server} />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
          }}
        ></div>
        <div className="d-flex flex-column container-fluid ">
          <Switch>
            <Route exact path={"/"}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="p-5 shadow ae-rounded w-50 ">
                  <div className="d-flex flex-column ">
                    {members.length > 0
                      ? members
                          .sort((a, b) => (a.access > b.access ? 1 : -1))
                          .map((user) => {
                            return (
                              <div className=" form-check">
                                <input
                                  type="radio"
                                  className={`form-check-input ${
                                    user.access === 3 ? "text-secondary" : ""
                                  }`}
                                  name="loginID"
                                  value={user.id}
                                  key={user.id}
                                  onChange={() => setLoginMember(user.id)}
                                  disabled={user.access === 3}
                                />
                                <label
                                  htmlFor={user.id}
                                  className={`form-check-label ${
                                    user.access === 3 ? "text-secondary" : ""
                                  }`}
                                >
                                  {user.name}
                                </label>{" "}
                              </div>
                            );
                          })
                      : null}
                  </div>
                  <a
                    href={`/home/${loginMember}`}
                    className="btn btn-primary mt-2"
                  >
                    Change State
                  </a>
                </div>
              </div>
            </Route>
            <Route exact path={"/home/"}>
              <Home date={date} server={server} />
            </Route>
            <Route exact path={"/home/:id"}>
              <Home date={date} server={server} />
            </Route>
            <Route exact path={"/users"}>
              <ProfileDisplay date={date} />
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
            <Route exact path={"/settings"}>
              <Settings server={server} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
