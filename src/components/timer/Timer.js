import React, { useEffect, useContext } from 'react';
import Button from '../button/Button';
import { TimerContext } from '../../contexts/TimerContext';

// let totalSeconds = 2700;

const Timer = (props) => {
  const { showPauseButton } = props
  const { time, dispatch, startPauseTimer, calculateTime } = useContext(TimerContext)


  useEffect(() => {
    if (!time.isPaused) {
      if (time.workoutSeconds > 0) {
        setTimeout(() => {
          let workoutSeconds = time['workoutSeconds'] - 1
          dispatch({type: 'UPDATE_TIME', workoutSeconds})
        }, 1000)
      }
    }
  });

  return (
    <div>
      {/*<p>{`${minutes}:${seconds % 60}`}</p>*/}
      <p>{ `${calculateTime(time.workoutSeconds)[0]}:${calculateTime(time.workoutSeconds)[1]}` }</p>
      {
        showPauseButton
        &&
        <Button className='start' onClick={startPauseTimer} title={time.isPaused ? "Resume" : "Pause"} />
      }
    </div>
  );
};

export default Timer;
