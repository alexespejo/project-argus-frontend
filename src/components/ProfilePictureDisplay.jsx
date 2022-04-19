import { useState } from "react";
import { storage } from "../argus-config";
import { ref, getDownloadURL } from "firebase/storage";

function ProfilePictureDisplay({ name, id, square = "10rem" }) {
  const [image, setImage] = useState(null);
  getDownloadURL(ref(storage, `${id}.jpeg`)).then((url) => {
    setImage(url);
  });
  return (
    <img
      src={image}
      alt={name}
      style={{
        width: square,
        height: square,
        borderRadius: "50%",
        objectFit: "cover",
        filter: "blur(1px)",
      }}
    />
  );
}

export default ProfilePictureDisplay;
