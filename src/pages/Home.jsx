import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { doc, getDoc } from "firebase/firestore";
import ProfileDisplay from "../components/ProfileDisplay";
import VideoDisplay from "../components/VideoDisplay";
import HistoryDisplay from "../components/HistoryDisplay";
import ProfilePictureDisplay from "../components/ProfilePictureDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Key from "../components/Key";
function HomePage({ date, server, dataMembers }) {
  const [member, setMember] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const findMember = async () => {
      const docRef = doc(db, "members", id);
      const docSnap = await getDoc(docRef);
      setMember(docSnap.data());
    };
    findMember();
  }, []);

  return (
    <div id="home-page d-flex flex-column ">
      <div className="d-flex flex-column flex-xl-row mb-xl-2">
        <VideoDisplay server={server} />
        <HistoryDisplay date={date} />
      </div>
      <div className="d-flex flex-column flex-xl-row">
        <ProfileDisplay date={date} dataMembers={dataMembers} />
        {id === undefined ? (
          " "
        ) : (
          <div className="d-flex flex-column w-50 align-items-center">
            <ProfilePictureDisplay name={member.name} id={id} />
            {member.name}
            <span>Access: {member.access}</span>
            <Key />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
