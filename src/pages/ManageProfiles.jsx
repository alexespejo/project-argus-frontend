import React from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import RegisterForm from "../components/RegisterForm";
import DeleteForm from "../components/DeleteForm";
import UpdateForm from "../components/UpdateForm";
const date = new Date();

function ManageProfiles() {
  return (
    <div>
      <ProfileDisplay date={date} />
      <RegisterForm />
      <DeleteForm />
      <UpdateForm />
    </div>
  );
}

export default ManageProfiles;
