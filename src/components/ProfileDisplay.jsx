import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs } from "firebase/firestore";
import ProfilePictureDisplay from "./ProfilePictureDisplay";
function ProfileDisplay({ date }) {
  const [members, setMembers] = useState([]);

  const usersCollectionRef = collection(db, "members");

  const listenMembers = async () => {
    return await getDocs(usersCollectionRef);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="container-sm">
      <h5>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 20 20"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        Profiles
      </h5>

      <div className={`shadow-sm container-fluid ae-rounded bg-body`}>
        {members.length > 0 ? (
          members
            .sort((a, b) => (a.access > b.access ? 1 : -1))
            .map((user, i) => {
              return (
                <div
                  key={user.id}
                  className={`container-fluid d-flex align-items-center p-3 pt-2 pb-1 ${
                    i !== 0 ? "border-top " : ""
                  }`}
                >
                  <ProfilePictureDisplay
                    name={user.name}
                    id={user.id}
                    square="2.5rem"
                  />
                  <div className="d-flex flex-column">
                    <span className="h4 ps-2 m-0">{user.name} </span>
                    <span className=" fw-light ps-2">
                      Access:{" "}
                      {user.access === 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#0099FF"
                          className="bi bi-person-check-fill"
                          viewBox="0  2  16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                          />
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      ) : user.access === 2 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#666666"
                          className="bi bi-person-fill"
                          viewBox="0  2  16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#666666"
                          className="bi bi-people-fill"
                          viewBox="0  2  16 16"
                        >
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path
                            fillRule="evenodd"
                            d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                          />
                          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      )}{" "}
                    </span>
                  </div>

                  <span
                    className="last-seen fw-light p-1"
                    style={{ fontSize: "0.5rem" }}
                  >
                    {user.lastAccess != null
                      ? `Last Seen: ${
                          user.lastAccess.month +
                            user.lastAccess.year +
                            user.lastAccess.day ===
                          30 * (1 + date.getMonth()) +
                            date.getFullYear() +
                            date.getDate()
                            ? "Today"
                            : user.lastAccess.month +
                                user.lastAccess.year +
                                user.lastAccess.day ===
                              30 * (1 + date.getMonth()) +
                                date.getFullYear() +
                                date.getDate() -
                                1
                            ? "Yest."
                            : `${user.lastAccess.month / 30}-${
                                user.lastAccess.day
                              }-${user.lastAccess.year}`
                        }
                        
                        (${
                          user.lastAccess.hour / 60 > 12
                            ? user.lastAccess.hour / 60 - 12
                            : user.lastAccess.hour / 60 === 0
                            ? "12"
                            : user.lastAccess.hour / 60
                        }${
                          user.lastAccess.minute < 10
                            ? `:0${user.lastAccess.minute}`
                            : `:${user.lastAccess.minute}`
                        }${user.lastAccess.hour / 60 > 12 ? "pm" : "am"}`
                      : "Has not accessed"}
                    )
                  </span>
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

export default ProfileDisplay;
