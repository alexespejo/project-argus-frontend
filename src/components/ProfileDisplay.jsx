import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs } from "firebase/firestore";
import ProfilePictureDisplay from "./ProfilePictureDisplay";
import LoadingSpinner from "./LoadingSpinner";
import {
  BsFillPersonCheckFill,
  BsPersonFill,
  BsPeopleFill,
} from "react-icons/bs";
function ProfileDisplay({ date }) {
  const [members, setMembers] = useState([]);
  const [windowDimenion, detectHW] = useState(window.innerWidth);

  const usersCollectionRef = collection(db, "members");

  const listenMembers = async () => {
    return await getDocs(usersCollectionRef);
  };

  useEffect(() => {
    window.addEventListener("resize", () => detectHW(window.innerWidth));

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    return () => {
      window.removeEventListener("resize", () => detectHW(window.innerWidth));
    };
  }, [windowDimenion]);
  return (
    <div className="container-sm">
      <a href="/profiles" className="link-style">
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
      </a>

      <div className={`shadow-sm container-fluid ae-rounded bg-body`}>
        {members.length > 0 ? (
          members
            .sort((a, b) => (a.access > b.access ? 1 : -1))
            .map((user, i) => {
              return (
                <div
                  key={user.id}
                  className={`container-fluid d-flex align-items-center pt-2 pb-1 ${
                    i !== 0 ? "border-top " : ""
                  }`}
                >
                  <a href={`profiles/${user.id}`}>
                    <ProfilePictureDisplay
                      name={user.name}
                      id={user.id}
                      square="2.5rem"
                    />
                  </a>
                  <div className="d-flex flex-column">
                    <span className="h4 ps-1 m-0">{user.name} </span>
                    <span className=" fw-light ps-2">
                      Access:{" "}
                      {user.access === 1 ? (
                        <BsFillPersonCheckFill />
                      ) : user.access === 2 ? (
                        <BsPersonFill />
                      ) : (
                        <BsPeopleFill />
                      )}{" "}
                    </span>
                  </div>

                  <span
                    className="last-seen fw-light p-1"
                    style={
                      windowDimenion >= 992
                        ? { fontSize: "1rem" }
                        : windowDimenion >= 500
                        ? { fontSize: "0.7rem" }
                        : { fontSize: "0.5rem" }
                    }
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
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}

export default ProfileDisplay;
