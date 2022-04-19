import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../argus-config";
import { doc, getDoc } from "firebase/firestore";
import ProfilePictureDisplay from "../components/ProfilePictureDisplay";

function UserPage() {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    const findDoc = async () => {
      const docRef = doc(db, "members", id);
      const docSnap = await getDoc(docRef);

      setMember(docSnap.data());
    };

    findDoc();
  }, []);
  console.log(member.name);
  return (
    <div>
      <h2>User: {member.name}</h2>
      <ProfilePictureDisplay name={member.name} id={id} />
    </div>
  );
}

export default UserPage;
