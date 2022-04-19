import { useState } from "react";
import { storage } from "../argus-config";
import { ref, getDownloadURL } from "firebase/storage";

function ProfilePictureDisplay({ name, id }) {
  const [image, setImage] = useState(null);
  getDownloadURL(ref(storage, `${id}.jpeg`)).then((url) => {
    setImage(url);
  });
  return (
    <img
      src={image}
      alt={name}
      style={{
        width: "10rem",
        height: "10rem",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}

export default ProfilePictureDisplay;
