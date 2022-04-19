import React from "react";
import { useState, useEffect } from "react";
import { storage, db } from "../argus-config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
function UploadImagePage() {
  const [profile, setProfile] = useState(null);
  const [identities, setIds] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    const imageRef = ref(storage, `${profile}.jpeg`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((err) => {
            console.log(err.message);
          });
        setImage(null);
      })
      .catch((err) => console.log(err.message));
  };
  const usersCollectionRef = collection(db, "members");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setIds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div>
      <select
        name="ids"
        id="profiles"
        onChange={(e) => {
          setProfile(e.target.value);
        }}
      >
        <option value="cock">Cock</option>
        {identities.map((users) => {
          return <option value={users.id}>{users.name}</option>;
        })}
      </select>

      <img src={url} alt="" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UploadImagePage;
