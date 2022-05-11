import React from "react";
import { useState, useEffect } from "react";
import { db } from "../argus-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";

function DeleteForm({ update }) {
  const [members, setMembers] = useState([]);
  const membersCollectionRef = collection(db, "members");
  const [show, setShow] = useState(false);
  const [selectMenue, setSelectMenue] = useState("");
  const [deleteCode, setDeleteCode] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const handleClose = () => {
    setShow(false);
    setConfirmMessage(!confirmMessage);
  };
  const handleShow = () => {
    setShow(!show);
    handleName();
  };

  const handleName = async () => {
    const docRef = doc(db, "members", selectMenue);
    const docSnap = await getDoc(docRef);
    setDeleteCode(docSnap.data().name);
    console.log(deleteCode);
  };
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
  }, [handleClose]);
  return (
    <div className="container-sm shadow-sm ae-rounded pb-2">
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div className="text-secondary w-100">
            Type{" "}
            <span className={`text-secondary opacity-50`}>
              delete{deleteCode}
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setConfirmCode(e.target.value);
            }}
          />
          <Button
            variant="danger"
            className="text-white"
            onClick={(e) => {
              e.preventDefault();
              if (confirmCode === `delete${deleteCode}`) {
                deleteProfile(document.getElementById("deleteMember").value);
                handleClose();
                update();
              } else {
                alert("worng code");
              }
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleShow}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={confirmMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{deleteCode} Has been deleted! </Modal.Title>
        </Modal.Header>
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
