import React, { useState, useEffect } from "react";
import { BsDoorOpen } from "react-icons/bs";
function Key() {
  const [windowDimenion, detectHW] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => detectHW(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => detectHW(window.innerWidth));
    };
  }, [windowDimenion]);
  return (
    <a
      className="btn btn-primary text-light text-center"
      href="http://192.168.254.127:5000/open_door"
    >
      <BsDoorOpen /> Open Door
    </a>
  );
}

export default Key;
