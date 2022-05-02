import { useState, useEffect } from "react";
import { db } from "../argus-config";
import HistoryChildrenDisplay from "../components/HistoryChildrenDisplay";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";

function UpdateUsersPage({ date }) {
  const [history, setHistory] = useState([]);
  const [member, setMember] = useState({});

  const hisotryCollectionRef = collection(db, "history");
  const id = "oSmeUZo2a356sWwE3FrM";
  console.log(id);
  useEffect(() => {
    const docRef = doc(db, "members", id);
    const findDoc = async () => {
      const docSnap = await getDoc(docRef);
      const historRef = await getDocs(hisotryCollectionRef);
      setHistory(historRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setMember(docSnap.data());
    };

    findDoc();
  }, []);
  return (
    <div>
      {" "}
      <div className="p-2 pe-3 h1 sticky-top">{member.name}</div>
      {history
        .filter((log) => {
          if (log.id !== "most_recent" && log.history[0].id === id) {
            return true;
          }
          return false;
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1))

        .map((log) => {
          //  if (log.history[0].name !== member.name) {
          //    db.collection("members").doc(log.id).update({
          //       history: [{

          //       }]
          //    });
          //  }
          return (
            <>
              {}
              <HistoryChildrenDisplay id={log.id} log={log} date={date} />
            </>
          );
        })}
    </div>
  );
}

export default UpdateUsersPage;
