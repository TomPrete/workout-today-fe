import React, { useContext, useEffect, useState } from 'react';
import ExerciseList from '../ExerciseList';
import { currentDay, getDate } from '../../helpers/dateHelpers';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import './TodaysWorkout.css'
import { submitWorkoutStatus } from '../../api/WorkoutAPI'
import Button from '../button/Button'

const TodaysWorkout = () => {
  const [workoutStatus, setWorkoutStatus] = useState(false)
  const { workout } = useContext(WorkoutContext)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displayWorkoutTarget = () => {
    if (workout['target'].length === 3) {
      return (
        `${capitalizeFirstLetter(workout['target'][0])}, ${capitalizeFirstLetter(workout['target'][1])} & ${capitalizeFirstLetter(workout['target'][2])}`
      )
    } else if (workout['target'].length === 2) {
      return (
        `${capitalizeFirstLetter(workout['target'][0])} & ${capitalizeFirstLetter(workout['target'][1])}`
      )
    } else {
      return (
        capitalizeFirstLetter(workout['target'][0])
      )
    }
  }

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

  return (
    <div>
      <div className='workout-header'>
        <p className='title'>{workout['target'] && displayWorkoutTarget()}</p>
        <p className='date'>{`${currentDay()}, ${getDate()}`}</p>
        <p>Calender</p>
      </div>
      {/*<Timer />*/}
      <ExerciseList changeWorkoutStatus={changeWorkoutStatus} />
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
