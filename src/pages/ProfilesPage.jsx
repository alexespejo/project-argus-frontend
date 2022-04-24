import { useState, useEffect } from "react";
import { db } from "../argus-config";

import { collection, getDocs } from "firebase/firestore";
import ProfilePicutreDisplay from "../components/ProfilePictureDisplay";
import {
  BsFillPersonCheckFill,
  BsPersonFill,
  BsPeopleFill,
} from "react-icons/bs";
function ProfilesPage({ date }) {
  const [members, setMembers] = useState([]);
  const [history, setHistory] = useState([]);
  const hisotryCollectionRef = collection(db, "history");
  const usersCollectionRef = collection(db, "members");

  useEffect(() => {
    const getUsers = async () => {
      const userRef = await getDocs(usersCollectionRef);
      const historRef = await getDocs(hisotryCollectionRef);
      setMembers(userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setHistory(historRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div>
      <h4 className="opacity-50 ">
        Date: {1 + date.getMonth()}/{date.getDate()}/{date.getFullYear()}
      </h4>
      <div className="d-flex flex-column flex-lg-row justify-content-center">
        {members.length > 0 ? (
          members
            .sort((a, b) => (a.access > b.access ? 1 : -1))
            .map((member, i) => {
              return (
                <div
                  key={member.id}
                  className="ae-rounded shadow-sm p-2 mt-2 border-light border d-flex flex-column align-items-center flex-grow-1"
                >
                  <div className="d-flex flex-column align-items-center ">
                    <a
                      href={`/profiles/${member.id}`}
                      className="link-dark d-flex flex-column align-items-center"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <ProfilePicutreDisplay
                        name={member.name}
                        id={member.id}
                      />
                      <h3 key={member.name} className="m-0">
                        {member.name}{" "}
                      </h3>
                    </a>
                    <div>
                      Access {member.access}:{" "}
                      {member.access === 1 ? (
                        <BsFillPersonCheckFill className="text-primary" />
                      ) : member.access === 2 ? (
                        <BsPersonFill />
                      ) : (
                        <BsPeopleFill />
                      )}
                    </div>
                    <div>
                      {member.lastAccess !== null ? (
                        <>
                          <span>
                            Last Seen:{" "}
                            {member.lastAccess.month +
                              member.lastAccess.year +
                              member.lastAccess.day ===
                            30 * (1 + date.getMonth()) +
                              date.getFullYear() +
                              date.getDate()
                              ? "Today"
                              : member.lastAccess.month +
                                  member.lastAccess.year +
                                  member.lastAccess.day ===
                                30 * (1 + date.getMonth()) +
                                  date.getFullYear() +
                                  date.getDate() -
                                  1
                              ? "Yest."
                              : `${member.lastAccess.month / 30}-${
                                  member.lastAccess.day
                                }-${member.lastAccess.year}`}{" "}
                          </span>
                          <span>
                            {member.lastAccess.hour / 60 > 12
                              ? member.lastAccess.hour / 60 - 12
                              : member.lastAccess.hour / 60 === 0
                              ? "12"
                              : member.lastAccess.hour / 60}
                            :{member.lastAccess.minute}
                            {member.lastAccess.hour / 60 > 12 ? "pm" : "am"}
                          </span>
                        </>
                      ) : (
                        <span>Has Not Accessed</span>
                      )}
                    </div>
                    <span className="fs-6 d-flex">History:</span>

                    <div
                      key={member.id + i}
                      className="px-3 d-flex flex-column"
                    >
                      {history
                        .filter((log) => {
                          if (
                            log.id !== "most_recent" &&
                            log.history[0].id === member.id
                          ) {
                            return true;
                          }
                          return false;
                        })
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .slice(1, 7)
                        .map((log) => {
                          if (log.id !== "most_recent") {
                            return (
                              <div
                                className="d-flex flex-grow-1 "
                                style={{ fontSize: "0.8rem" }}
                              >
                                {log.history[0].timeStamp.month +
                                  log.history[0].timeStamp.year +
                                  log.history[0].timeStamp.day ===
                                30 * (1 + date.getMonth()) +
                                  date.getFullYear() +
                                  date.getDate() ? (
                                  <span>Today</span>
                                ) : log.history[0].timeStamp.month +
                                    log.history[0].timeStamp.year +
                                    log.history[0].timeStamp.day ===
                                  30 * (1 + date.getMonth()) +
                                    date.getFullYear() +
                                    date.getDate() -
                                    1 ? (
                                  <span>Yesterday</span>
                                ) : (
                                  <span>
                                    {log.history[0].timeStamp.month / 30}-
                                    {log.history[0].timeStamp.day}-
                                    {log.history[0].timeStamp.year - 2000}{" "}
                                  </span>
                                )}
                                <span className="text-secondary opacity-75 ps-1 ">
                                  {" "}
                                  {log.history[0].timeStamp.hour / 60 > 12
                                    ? log.history[0].timeStamp.hour / 60 - 12
                                    : log.history[0].timeStamp.hour / 60 === 0
                                    ? "12"
                                    : log.history[0].timeStamp.hour / 60}
                                  {log.history[0].timeStamp.minute < 10
                                    ? `:0`
                                    : `:`}
                                  {log.history[0].timeStamp.minute}
                                  {log.history[0].timeStamp.hour / 60 > 12
                                    ? "pm"
                                    : "am"}
                                </span>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border ae-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilesPage;
