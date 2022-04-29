import { useState } from "react";
import { storage, db } from "../argus-config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

function CreateMembers() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    const imageRef = ref(
      storage,
      `${document.getElementById("RegisterName").value}${
        document.getElementById("RegisterAccess").value
      }.jpeg`
    );
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef).catch((err) => {
          console.log(err.message);
        });
        setImage(null);
      })
      .catch((err) => console.log(err.message));
  };
  const usersCollectionRef = collection(db, "members");

  return (
    <div className="container-sm shadow-sm ae-rounded">
      <h5>Create Profile</h5>
      <form
        action="http://172.17.83.140:5001/upload"
        method="POST"
        enctype="multipart/form-data"
        className="d-flex flex-column"
      >
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Face ID
          </label>
          <input
            className="form-control"
            name="file"
            type="file"
            id="formFile"
            onChange={handleImageChange}
            required
          />
        </div>
        <label for="RegisterName">Your name:</label>
        <input
          type="text"
          name="name"
          id="RegisterName"
          className="mb-3 form-control"
          required
        />

        <label for="RegisterAccess"> Access Tier: </label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          name="access"
          id="RegisterAccess"
        >
          <option value="1">Tier One</option>
          <option value="2">Tier Two</option>
          <option value="3" selected>
            Tier Three
          </option>
        </select>

        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateMembers;
