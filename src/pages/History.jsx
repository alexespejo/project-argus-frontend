import React from "react";
import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs } from "firebase/firestore";
import HistoryChildrenDisplay from "../components/HistoryChildrenDisplay";

function History({ date }) {
  const [history, setHistory] = useState([]);
  const [filterHistory, setFilter] = useState("0");
  const hisotryCollectionRef = collection(db, "history");
  let tracker = 0;

  const listenHistory = async () => {
    return await getDocs(hisotryCollectionRef);
  };
  // console.log(history.splice(1, 4));
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    const getLogs = async () => {
      const data = await getDocs(hisotryCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getLogs();
  }, [handleFilter]);
  return (
    <div>
      <select
        name="filterHistory"
        id="filterHistory"
        className="form-select mb-3"
        onChange={handleFilter}
      >
        <option value="2">Today</option>
        <option value="1">Complete History</option>
        <option value="3">Yesterday</option>
        <option value="4">Past 7 Days</option>
      </select>

      <div className="scroll-hide overflow-scroll" style={{ height: "35rem" }}>
        {" "}
        {history
          .filter((log) => {
            if (log.id === "most_recent") {
              console.log("found it");
              return;
            }
            switch (filterHistory) {
              case "0":
                if (
                  log.history[0].timeStamp.month / 30 +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day ===
                  1 + date.getMonth() + date.getFullYear() + date.getDate()
                ) {
                  return true;
                }

                break;
              case "1":
                if (
                  log.history[0].timeStamp.month / 30 +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day <=
                  1 + date.getMonth() + date.getFullYear() + date.getDate()
                ) {
                  return true;
                }
                break;
              case "2":
                if (
                  log.history[0].timeStamp.month / 30 +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day ===
                  1 + date.getMonth() + date.getFullYear() + date.getDate()
                ) {
                  return true;
                }
                break;
              case "3":
                if (
                  log.history[0].timeStamp.month / 30 +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day ===
                  1 + date.getMonth() + date.getFullYear() + date.getDate() - 1
                ) {
                  return true;
                }
                break;
              case "4":
                if (
                  log.history[0].timeStamp.month / 30 +
                    log.history[0].timeStamp.year +
                    log.history[0].timeStamp.day >=
                  1 + date.getMonth() + date.getFullYear() + date.getDate() - 7
                ) {
                  return true;
                }
                break;
              default:
                return false;
            }
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
                <HistoryChildrenDisplay id={log.id} log={log} date={date} />
              );
            }
          })}
      </div>
    </div>
  );
}

export default History;
