import { useState, useEffect } from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import RegisterForm from "../components/RegisterForm";
import DeleteForm from "../components/DeleteForm";
import UpdateForm from "../components/UpdateForm";
const date = new Date();

function ManageProfiles({ server }) {
  const [deleteScreen, showDeleteScreen] = useState(false);
  const updateScreen = () => {
    alert("update screen");
  };
  useEffect(() => {}, [updateScreen]);
  return (
    <div>
      <div className="d-flex flex-column">
        <ProfileDisplay date={date} update={updateScreen} />
        <button
          className={`${
            !deleteScreen ? "text-danger" : "text-secondary"
          } btn align-self-end`}
          onClick={() => {
            showDeleteScreen(!deleteScreen);
          }}
        >
          {!deleteScreen ? "Delete" : "Return "}
        </button>
      </div>
      <div className="px-lg-5">
        <div className={`${!deleteScreen ? "d-block" : "d-none"} `}>
          <RegisterForm server={server} update={updateScreen} />
        </div>
        <div className={`${deleteScreen ? "d-block" : "d-none"} `}>
          <DeleteForm update={updateScreen} />
        </div>
        <div className={`${!deleteScreen ? "d-block" : "d-none"}`}>
          <UpdateForm server={server} />
        </div>
      </div>
    </div>
  );
}

export default ManageProfiles;
