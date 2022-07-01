import React, { useContext, useEffect, useState } from 'react';
import ExerciseList from '../ExerciseList';
import { currentDay, getDate } from '../../helpers/dateHelpers';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import './TodaysWorkout.css'
import { submitWorkoutStatus } from '../../api/WorkoutAPI'
import Button from '../button/Button'
import Loading from '../loading/Loading';
// import ProgressBar from '../progress-bar/ProgressBar';

const TodaysWorkout = () => {
  const [workoutStatus, setWorkoutStatus] = useState(false)
  const [showAbWorkout, setShowAbWorkout] = useState(false)
  const { workout } = useContext(WorkoutContext)

  useEffect(() => {
    if (localStorage.getItem('workoutStatus') && localStorage.getItem('workoutDate') === getDate()) {
      setWorkoutStatus(localStorage.getItem('workoutStatus'))
    }
  }, [])

  const changeWorkoutStatus = async (status) => {
    localStorage.setItem('workoutStatus', status)
    localStorage.setItem('workoutDate', getDate())
    setWorkoutStatus(localStorage.getItem('workoutStatus'))
    let response = await submitWorkoutStatus(status)
  }

  if (workout['loading']) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <div className='workout-header'>
        <div className='date-container'>
          <div className='weekday'>{ currentDay() }</div>
          <div className='date'>{ getDate() }</div>
        </div>
        <p className='title'>{workout['target'] && workout['target']}</p>
        <div className='rounds'>{`x${workout['rounds']} Round${workout['rounds'] > 1 ? 's' : ''}`}</div>
      </div>
      {/*<Timer />*/}
      <ExerciseList changeWorkoutStatus={changeWorkoutStatus} showAbWorkout={showAbWorkout} />
      {
        workoutStatus !== 'finished'
          && workoutStatus == 'started'
          ?
          <h1>Keep Going!</h1>
          :
          <Button
            title='Start'
            onClick={() => changeWorkoutStatus('started')}
          />
      }
    </div>
  );
};

export default TodaysWorkout;
