import { useState } from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import RegisterForm from "../components/RegisterForm";
import DeleteForm from "../components/DeleteForm";
import UpdateForm from "../components/UpdateForm";
const date = new Date();

function ManageProfiles({ server }) {
  const [deleteScreen, showDeleteScreen] = useState(false);

  return (
    <div>
      <ProfileDisplay date={date} />
      <button
        className={`${!deleteScreen ? "text-danger" : "text-secondary"} btn `}
        onClick={() => {
          showDeleteScreen(!deleteScreen);
        }}
      >
        {!deleteScreen ? "Delete" : "Return "}
      </button>
      <div className="px-lg-5">
        <div className={`${!deleteScreen ? "d-block" : "d-none"} `}>
          <RegisterForm server={server} />
        </div>
        <div className={`${deleteScreen ? "d-block" : "d-none"} `}>
          <DeleteForm />
        </div>
        <div className={`${!deleteScreen ? "d-block" : "d-none"}`}>
          <UpdateForm server={server} />
        </div>
      </div>
    </div>
  );
}

export default ManageProfiles;
