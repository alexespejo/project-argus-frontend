import React, { useState, useEffect } from "react";
import { db } from "../argus-config";
import { collection, getDocs } from "firebase/firestore";
import { Accordion } from "react-bootstrap";
import {
  BsHouseDoor,
  BsClockHistory,
  BsCameraVideo,
  BsGear,
  BsPersonCircle,
  BsPerson,
} from "react-icons/bs";
function HamburgerMenue({ onClick }) {
  return (
    <div className="open-sidebar p-2 bg-white" onClick={onClick}>
      <div className="hamburger-menue ae-rounded">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
function NavBar() {
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState([]);
  const usersCollectionRef = collection(db, "members");

  function MemberLinks() {
    return (
      <div className="d-flex flex-column">
        {members.length > 0
          ? members
              .sort((a, b) => (a.access > b.access ? 1 : -1))
              .map((user) => {
                return (
                  <a
                    className="p-2 border-top members-links"
                    href={`/profiles/${user.id}`}
                    key={user.id}
                  >
                    {user.name}
                  </a>
                );
              })
          : null}
      </div>
    );
  }
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
    });
  };

  const showMask = () => {
    setShow(!show);
    if (show) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (window.innerWidth >= 992) {
      setShow(false);
    }
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion, show]);

  const iconStyle = () => {
    if (window.innerWidth >= 922 && window.innerWidth <= 1200) {
      return { fontSize: "1.5rem", width: "1.5rem" };
    }
    return { fontSize: "1rem", marginBottom: "0.3rem" };
  };
  return (
    <div className="sticky-top">
      {" "}
      {window.innerWidth <= 992 ? (
        <>
          <HamburgerMenue
            onClick={() => {
              showMask();
            }}
          />
        </>
      ) : null}
      <div
        id="mySidebar"
        className="sidebar"
        style={
          show || window.innerWidth >= 1200
            ? { width: "12rem" }
            : window.innerWidth >= 992
            ? { width: "fit-content" }
            : { width: "0" }
        }
      >
        {window.innerWidth <= 992 ? (
          <HamburgerMenue
            onClick={() => {
              showMask();
            }}
          />
        ) : null}
        <a href="/">
          <BsHouseDoor style={iconStyle()} /> <span className="">Home</span>
        </a>
        <a href="/">
          <BsClockHistory style={iconStyle()} />{" "}
          <span className="">History</span>
        </a>
        <a href="/video">
          {" "}
          <BsCameraVideo style={iconStyle()} /> <span className="">Camera</span>
        </a>
        <a href="">
          <BsGear style={iconStyle()} />{" "}
          <span className="">Configurations</span>
        </a>
        <a href="/configure">
          {" "}
          <BsPerson style={iconStyle()} />{" "}
          <span className=""> Manage Profiles</span>
        </a>

        {window.innerWidth <= 992 ? (
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <div className="d-flex override ">
                <a href="/profiles" style={{ paddingRight: "1rem" }}>
                  <BsPersonCircle style={iconStyle()} /> <span>Profiles</span>{" "}
                </a>
                <Accordion.Button
                  style={{
                    boxShadow: "none",
                    borderColor: "black",
                    marginLeft: "auto",
                    paddingRight: "2rem",
                    color: "black",
                    width: "40%",
                    border: "none",
                  }}
                ></Accordion.Button>
              </div>
              <Accordion.Body style={{ padding: "0" }}>
                <MemberLinks />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          <>
            <a href="/profiles">
              <BsPersonCircle style={iconStyle()} /> <span>Profiles</span>{" "}
            </a>
            <MemberLinks />
          </>
        )}
        <a href="" id="settings-icon">
          Settings
        </a>
      </div>
      {show ? (
        <div
          className="mask"
          onClick={() => {
            showMask();
          }}
        ></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavBar;
