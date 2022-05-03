import React from "react";
import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";

function DeleteForm() {
  const [members, setMembers] = useState([]);
  const membersCollectionRef = collection(db, "members");
  const [show, setShow] = useState(false);
  const [selectMenue, setSelectMenue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteProfile = async (profile) => {
    return await deleteDoc(doc(db, "members", profile));
  };
  const changeSelectMenue = (e) => {
    setSelectMenue(e.target.value);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            variant="danger"
            className="text-white"
            onClick={(e) => {
              e.preventDefault();
              deleteProfile(document.getElementById("deleteMember").value);
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <h5>Remove Profile</h5>
      <label for="deleteMember" className="form-label">
        Delete a Member
      </label>
      <select
        id="deleteMember"
        className="mb-3 form-select"
        onChange={changeSelectMenue}
      >
        <option value="" selected disabled>
          Slect a Member
        </option>
        {members.length > 0
          ? members
              .sort((a, b) => (a.access > b.access ? 1 : -1))
              .map((user) => {
                console.log(user.idj);
                return <option value={user.id}>{user.name}</option>;
              })
          : null}
      </select>
      <Button
        variant="danger"
        className={selectMenue === "" ? "disabled" : ""}
        onClick={handleShow}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteForm;
