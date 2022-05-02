import React from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import VideoDisplay from "../components/VideoDisplay";
import HistoryDisplay from "../components/HistoryDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import Key from "../components/Key";

function HomePage({ date, server }) {
  return (
    <div id="home-page d-flex flex-column ">
      <div className="d-flex flex-column flex-xl-row mb-xl-2">
        <VideoDisplay server={server} />
        <HistoryDisplay date={date} />
      </div>
      <div className="d-flex flex-column flex-xl-row">
        <ProfileDisplay date={date} />
      </div>
    </div>
  );
}

export default HomePage;
