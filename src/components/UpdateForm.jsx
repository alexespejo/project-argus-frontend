import React, { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
function UpdateForm({ server }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(0);

  const membersCollectionRef = collection(db, "members");

  const getUsers = async () => {
    const data = await getDocs(membersCollectionRef);
    setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const options = [1, 2, 3];
  const selectMember = async (event) => {
    const selectedRef = doc(db, "members", event.target.value);
    const docSnap = await getDoc(selectedRef);
    setSelected(docSnap.data().access);
  };

  useEffect(() => {
    getUsers();
    console.log(selected);
  }, [selectMember]);

  return (
    <div className="container-sm shadow-sm ae-rounded">
      <h5>Update Profile</h5>
      <form
        action={`${server}/update`}
        method="POST"
        enctype="multipart/form-data"
      >
        <label for="updateMember">Update a Profile</label>
        <select
          id="updateMember"
          className="form-select mb-2"
          name="updateMember"
          onChange={selectMember}
        >
          <option value="-1" disabled selected>
            Choose A Profile
          </option>

          {members.length > 0
            ? members
                .sort((a, b) => (a.access > b.access ? 1 : -1))
                .map((user) => {
                  return <option value={user.id}>{user.name}</option>;
                })
            : null}
        </select>
        <div className="mb-2">
          {" "}
          <label for="changeName">Update Name</label>
          <input type="text" name="changeName" className="form-control" />
        </div>
        <div className="mb-2">
          <label for="">Update Access Tier</label>
          <select name="changeAccess" id="changeAccess" className="form-select">
            {selected === 0 ? (
              <option disabled selected>
                Change Here
              </option>
            ) : (
              <option
                disabled
                selected
                aria-label="Disabled select example"
                value={selected}
              >
                {" "}
                Tier {selected}
              </option>
            )}
            {options.map((i) => {
              return (
                <>
                  {selected !== 0 && i !== selected ? (
                    <option value={i}>Tier {i}</option>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary">Update</button>
        <a href="/" className="float-end pt-2 px-3">
          Reset
        </a>
      </form>
    </div>
  );
}

export default UpdateForm;
