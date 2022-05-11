import React from "react";
import { useState, useRef } from "react";
import { Overlay, Button, Popover } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
function Settings({ server }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <>
      <form
        action={`${server}/configuration`}
        method="POST"
        enctype="multipart/form-data"
      >
        <label for="cameraDuration" className="mb-3">
          Change Time Limit
          <span className="m-2 " onClick={handleClick}>
            <BsInfoCircle
              style={{ fontSize: "1rem", width: "1rem", cursor: "pointer" }}
            />
          </span>
        </label>
        <div id="cameraDuration-output"></div>
        <select
          name="cameraDuration"
          id="cameraDuration"
          className="form-select"
          aria-label="Default select example"
        >
          <option value="5" selected>
            5 seconds
          </option>
          <option value="30">30 seconds</option>
          <option value="60">1 minute</option>
          <option value="120">2 minutes</option>
        </select>
        <input
          type="submit"
          class="btn btn-primary mt-3 "
          value="Make Change"
        />
      </form>

      <div ref={ref}>
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <strong>Change how often the camera scans faces</strong>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  );
}

export default Settings;
