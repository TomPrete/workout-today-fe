import React, { useState, useEffect } from 'react';
let minutes = 59;

const Timer = () => {
  const [seconds, setSeconds] = useState(3600);

  const calculateTimeLeft = () => {
    // let timeLeft = startingMinutes * 60;

    minutes = Math.floor(seconds / 60)
    let secondsTotal = seconds % 60
    console.log(`${minutes}: ${secondsTotal}`)
    setSeconds(seconds - 1)
  }

  useEffect(() => {
    setInterval(calculateTimeLeft, 1000)
  }, []);


  console.log(seconds)

  return (
    <div>
      <p>{`${minutes}:${seconds % 60}`}</p>
    </div>
  );
};

export default Timer;
