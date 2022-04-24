import { useState } from "react";
import { storage } from "../argus-config";
import { ref, getDownloadURL } from "firebase/storage";

function ProfilePictureDisplay({ name, id, square = "10rem" }) {
  const [image, setImage] = useState(null);
  getDownloadURL(ref(storage, `${id}.jpeg`)).then((url) => {
    setImage(url);
  });
  const iconStyle = {
    width: square,
    height: square,
    borderRadius: "50%",
    objectFit: "cover",
    background: "black",
  };
  return (
    <>
      <img
        src={
          image !== null
            ? image
            : "https://www.colorbook.io/imagecreator.php?hex=adb5bd&width=1920&height=1080&text=%201920x1080"
        }
        alt={name}
        style={iconStyle}
      />
    </>
  );
}

export default ProfilePictureDisplay;
