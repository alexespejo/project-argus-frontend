import React from "react";

function historyChildrenDisplay({ id, log, date }) {
  return (
    <div key={id} className={"log-child p-3 pt-1 pb-1"}>
      <div>
        {log.history[0].access === 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#0099FF"
            className="bi bi-person-check-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        ) : log.history[0].access === 2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#666666"
            className="bi bi-person-fill"
            viewBox="0  0  16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        ) : log.history[0].access === 3 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#666666"
            className="bi bi-people-fill"
            viewBox="0  0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fillRule="evenodd"
              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="red"
            className="bi bi-question-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
            />
          </svg>
        )}
      </div>
      <div>
        {" "}
        <span className="h5"> {log.history[0].name}: </span>
      </div>
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
