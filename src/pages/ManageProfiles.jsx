import React from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import RegisterForm from "../components/RegisterForm";
import DeleteForm from "../components/DeleteForm";
const date = new Date();

function ManageProfiles() {
  return (
    <div>
      <ProfileDisplay date={date} />
      <RegisterForm />
      <DeleteForm />
    </div>
  );
}

export default ManageProfiles;
