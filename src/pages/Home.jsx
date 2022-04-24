import React from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import VideoDisplay from "../components/VideoDisplay";
import HistoryDisplay from "../components/HistoryDisplay";
import RegisterForm from "../components/RegisterForm";
import DeleteForm from "../components/DeleteForm";
import UpdateForm from "../components/UpdateForm";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage({ date }) {
  return (
    <div id="home-page d-flex flex-column ">
      <div className="d-flex flex-column flex-xl-row mb-xl-2">
        <VideoDisplay />
        <HistoryDisplay date={date} />
        <ProfileDisplay date={date} />
      </div>
      <div className="d-flex flex-column flex-xl-row">
        <RegisterForm />
        <DeleteForm />
        <UpdateForm />
      </div>
    </div>
  );
}

export default HomePage;
