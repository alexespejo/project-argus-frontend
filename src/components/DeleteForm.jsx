import React from "react";
import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
function DeleteForm() {
  const [members, setMembers] = useState([]);
  const membersCollectionRef = collection(db, "members");

  const deleteProfile = async (profile) => {
    return await deleteDoc(doc(db, "members", profile));
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(membersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="container-sm shadow-sm ae-rounded pb-2">
      <h5>Remove Profile</h5>
      <label for="deleteMember" className="form-label">
        Delete a Member
      </label>
      <select id="deleteMember" className="mb-3 form-select">
        {members.length > 0
          ? members
              .sort((a, b) => (a.access > b.access ? 1 : -1))
              .map((user) => {
                console.log(user.idj);
                return <option value={user.id}>{user.name}</option>;
              })
          : null}
      </select>
      <button
        className="btn btn-danger   "
        onClick={(e) => {
          e.preventDefault();
          deleteProfile(document.getElementById("deleteMember").value);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteForm;
