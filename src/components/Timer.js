import React, { useState, useEffect } from 'react';
let totalSeconds = 2700;

const Timer = () => {
  const [seconds, setSeconds] = useState(2700);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    if (!isPaused) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000)
      } else {
        setSeconds("Next Exercise")
      }
    }
  });

  const pauseTimer = () => {
    setIsPaused(!isPaused)
  }

  const calculateTime = (seconds) => {
    let remainingMinutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds - remainingMinutes * 60
    if (remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`
    }
    return [remainingMinutes, remainingSeconds]
  }

  return (
    <div>
      {/*<p>{`${minutes}:${seconds % 60}`}</p>*/}
      <p>{ `${calculateTime(seconds)[0]}:${calculateTime(seconds)[1]}` }</p>
      <button onClick={pauseTimer}>{isPaused ? "Resume" : "Pause"}</button>
    </div>
  );
};

export default Timer;
