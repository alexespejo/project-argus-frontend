import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../argus-config";
import ProfilePictureDisplay from "../components/ProfilePictureDisplay";
import HistoryChildrenDisplay from "../components/HistoryChildrenDisplay";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import {
  BsFillPersonCheckFill,
  BsPersonFill,
  BsPeopleFill,
} from "react-icons/bs";
function UserPage({ date }) {
  const [windowDimenion, detectHW] = useState(window.innerWidth);
  let tracker = 0;
  const { id } = useParams();
  const [member, setMember] = useState({});
  const [history, setHistory] = useState([]);
  const hisotryCollectionRef = collection(db, "history");

  useEffect(() => {
    window.addEventListener("resize", () => detectHW(window.innerWidth));

    const docRef = doc(db, "members", id);

    const findDoc = async () => {
      const docSnap = await getDoc(docRef);
      const historRef = await getDocs(hisotryCollectionRef);
      setHistory(historRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      setMember(docSnap.data());
    };

    findDoc();
    return () => {
      window.removeEventListener("resize", () => detectHW(window.innerWidth));
    };
  }, [windowDimenion]);
  return (
    <div className="d-flex flex-column flex-lg-row ">
      <div className="d-flex flex-column align-items-center  ae-rounded shadow-lg shadow-sm m-lg-5 w-100">
        <div className="p-2 pe-3 ">
          <ProfilePictureDisplay
            name={member.name}
            id={id}
            square={windowDimenion >= 992 ? "15rem" : "12rem"}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <span className="fs-2">{member.name}</span>
          <span className="fs-5">
            Access {member.access}:{" "}
            {member.access === 1 ? (
              <BsFillPersonCheckFill className="text-primary" />
            ) : member.access === 2 ? (
              <BsPersonFill />
            ) : (
              <BsPeopleFill />
            )}
          </span>
          <span className="fs-5">
            {member.lastAccess != null
              ? `Last Seen: ${
                  member.lastAccess.month +
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
                      }-${member.lastAccess.year}`
                }
                        
                        ${
                          member.lastAccess.hour / 60 > 12
                            ? member.lastAccess.hour / 60 - 12
                            : member.lastAccess.hour / 60 === 0
                            ? "12"
                            : member.lastAccess.hour / 60
                        }${
                  member.lastAccess.minute < 10
                    ? `:0${member.lastAccess.minute}`
                    : `:${member.lastAccess.minute}`
                }${member.lastAccess.hour / 60 > 12 ? "pm" : "am"}`
              : "Has not accessed"}
          </span>
        </div>
      </div>

      <div className="d-flex flex-column w-100 shadow-sm ae-rounded">
        <h5>History:</h5>
        <div
          className="scroll-hide overflow-scroll"
          style={{ height: "35rem" }}
        >
          {" "}
          {history
            .filter((log) => {
              if (log.id !== "most_recent" && log.history[0].id === id) {
                return true;
              }
              return false;
            })
            .sort((a, b) => (a.date > b.date ? -1 : 1))

            .map((log) => {
              if (log.id !== "most_recent") {
                if (
                  tracker !==
                  log.history[0].timeStamp.month +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day
                ) {
                  tracker =
                    log.history[0].timeStamp.month +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day;
                  return (
                    <>
                      <span className="shadow bg-primary text-light py-1 px-2">
                        {log.history[0].timeStamp.month / 30}-
                        {log.history[0].timeStamp.day}-
                        {log.history[0].timeStamp.year}{" "}
                      </span>
                      <HistoryChildrenDisplay
                        id={log.id}
                        log={log}
                        date={date}
                        lock={true}
                      />
                    </>
                  );
                }
                return (
                  <HistoryChildrenDisplay
                    id={log.id}
                    log={log}
                    date={date}
                    lock={true}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
