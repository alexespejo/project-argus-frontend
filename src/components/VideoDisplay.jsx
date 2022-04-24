import { useState } from "react";
import { Carousel } from "react-bootstrap";
function VideoDisplay() {
  const [cameras, setCameras] = useState([
    // "http://192.168.254.127:5000/video_feed",
    "http://192.168.254.125:5001/video_feed",
  ]);
  return (
    <div className="container-sm" id="video-footage">
      <a href="/video">
        {" "}
        <h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#ff0000"
            class="bi bi-record-circle"
            viewBox="0 0 18 21"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
          Camera
        </h5>
      </a>

      {cameras.length > 1 ? (
        <Carousel>
          {cameras.map((camera, i) => {
            return (
              <Carousel.Item>
                <img
                  className="img-fluid ae-rounded w-100 "
                  src={camera}
                  alt={`Camera ${i}`}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <img
          className="img-fluid ae-rounded w-100 "
          src={cameras[0]}
          alt={`Main`}
        />
      )}
    </div>
  );
}

export default VideoDisplay;
