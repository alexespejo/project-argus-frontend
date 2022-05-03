import React, { useState, useEffect } from "react";
import { BsDoorOpen } from "react-icons/bs";
function Key({ server }) {
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
      href={`${server}/open_door`}
    >
      <BsDoorOpen /> Open Door
    </a>
  );
}

export default Key;
