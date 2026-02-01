import React from "react";
import { useState, useEffect, useRef } from "react";
import "./stopwatch.css";

function StopWatch() {
  const [time, setTime] = useState(0); // store time in milliseconds
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // update every 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // cleanup
  }, [running]);

  // Convert time
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };

  return (
    <div style={{ fontFamily: "monospace", textAlign: "center" }}>
      <h1>
        <span className="time-card">{String(hours).padStart(2, "0")}</span>:
        <span className="time-card">{String(minutes).padStart(2, "0")}</span>:
        <span className="time-card">{String(seconds).padStart(2, "0")}</span>.
        <span className="time-card">
          {String(milliseconds).padStart(2, "0")}
        </span>
      </h1>

      {!running ? (
        <button className="btn-card start-btn" onClick={() => setRunning(true)}>
          Start
        </button>
      ) : (
        <button
          className="btn-card pause-btncd stopwatch"
          onClick={() => setRunning(false)}
        >
          Pause
        </button>
      )}

      <button className="btn-card reset-btn" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default StopWatch;

// function StopWatch() {
//   const [min, setMin] = useState(0);
//   const [sec, setSec] = useState(0);

//   function onStart() {
//     let interval = setInterval(() => {
//       console.log("fghjkl");
//       setSec((prev) => {
//         return prev + 1;
//       });
//     }, 1000);
//   }

//   function onStop() {
//     clearInterval(interval);
//   }

//   return (
//     <div>
//       {min}:{sec}
//       <div className="btn-container">
//         <button onClick={onStart}>Start</button>
//         <button onClick={onStop}>Pause</button>
//         <button>reset</button>
//       </div>
//     </div>
//   );
// }

// export default StopWatch;
