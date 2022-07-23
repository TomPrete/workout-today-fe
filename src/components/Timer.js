import React, { useState, useEffect, useContext } from 'react';
import Button from './button/Button';
import { TimerContext } from '../contexts/TimerContext';

let totalSeconds = 2700;

const Timer = (props) => {
  const { startTime, showPauseButton } = props
  const { time, dispatch } = useContext(TimerContext)
  const [seconds, setSeconds] = useState(startTime);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    if (!isPaused) {
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds(seconds - 1)
          let workoutSeconds = time['workoutSeconds'] - 1
          dispatch({type: 'UPDATE_TIME', workoutSeconds})
        }, 1000)
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
      <Button className='start' onClick={pauseTimer} title={isPaused ? "Resume" : "Pause"} />
    </div>
  );
};

export default Timer;
