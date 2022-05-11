import { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs } from "firebase/firestore";
function LoginScreen({ date }) {
  const [members, setMembers] = useState([]);
  const usersCollectionRef = collection(db, "members");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div>
      <div className="d-flex flex-column ">
        {members.length > 0
          ? members
              .sort((a, b) => (a.access > b.access ? 1 : -1))
              .map((user) => {
                return (
                  <div className={`form-check`}>
                    <input
                      type="radio"
                      className={`form-check-input ${
                        user.access === 3 ? "bg-warning" : ""
                      }`}
                      name="flexRadioDefault"
                      value={user.id}
                      key={user.id}
                    />
                    <label htmlFor={user.id} className="form-check-label">
                      {user.name}
                    </label>{" "}
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
}

export default LoginScreen;
