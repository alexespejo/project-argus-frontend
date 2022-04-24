import React from "react";
import {
  BsFillPersonCheckFill,
  BsPersonFill,
  BsPeopleFill,
  BsQuestionLg,
  BsUnlock,
  BsLock,
} from "react-icons/bs";
function historyChildrenDisplay({ id, log, date, lock = false }) {
  return (
    <div
      key={id}
      className={"log-child p-3 pt-1 pb-1"}
      style={lock ? { fontSize: "1rem" } : null}
    >
      {lock ? (
        <>
          Door{"  "}
          {log.history[0].locked ? (
            <>
              Unlocked:
              <BsUnlock />
            </>
          ) : (
            <>
              Locked:
              <BsLock />
            </>
          )}
        </>
      ) : (
        <>
          <div>
            {log.history[0].access === 1 ? (
              <BsFillPersonCheckFill />
            ) : log.history[0].access === 2 ? (
              <BsPersonFill />
            ) : log.history[0].access === 3 ? (
              <BsPeopleFill />
            ) : (
              <BsQuestionLg style={{ color: "red" }} />
            )}
          </div>
          <div>
            {" "}
            <span className="h5"> {log.history[0].name}: </span>
          </div>
        </>
      )}
      <div>
        <span>
          {" "}
          {log.history[0].timeStamp.hour / 60 > 12
            ? log.history[0].timeStamp.hour / 60 - 12
            : log.history[0].timeStamp.hour / 60 === 0
            ? "12"
            : log.history[0].timeStamp.hour / 60}
          {log.history[0].timeStamp.minute < 10 ? `:0` : `:`}
          {log.history[0].timeStamp.minute}
          {log.history[0].timeStamp.hour / 60 > 12 ? "pm" : "am"}
        </span>
        {log.history[0].timeStamp.month +
          log.history[0].timeStamp.year +
          log.history[0].timeStamp.day ===
        30 * (1 + date.getMonth()) + date.getFullYear() + date.getDate() ? (
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
            {log.history[0].timeStamp.month / 30}-{log.history[0].timeStamp.day}
            -{log.history[0].timeStamp.year}{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default historyChildrenDisplay;
