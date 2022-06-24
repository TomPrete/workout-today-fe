import React, { useContext, useEffect, useState } from 'react';
import ExerciseList from '../ExerciseList';
import Timer from '../Timer';
import { currentDay, getDate } from '../../helpers/dateHelpers';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import './TodaysWorkout.css'
import { startWorkout } from '../../api/WorkoutAPI'

const TodaysWorkout = () => {
  const [startedWorkout, setStartedWorkout] = useState(false)
  const { workout } = useContext(WorkoutContext)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displayWorkoutTarget = () => {
    if (workout['target'].length === 3) {
      return (
        `${capitalizeFirstLetter(workout['target'][0])}, ${capitalizeFirstLetter(workout['target'][1])} and ${capitalizeFirstLetter(workout['target'][2])}`
        )
      }
      return (
      `${capitalizeFirstLetter(workout['target'][0])} and ${capitalizeFirstLetter(workout['target'][1])}`
    )
  }

  useEffect(() => {
    if (localStorage.getItem('workoutStatus') && localStorage.getItem('workoutDate') === getDate()) {
      setStartedWorkout(localStorage.getItem('workoutStatus'))
    }
  }, [])

  const beginWorkout = async () => {
    localStorage.setItem('workoutStatus', 'started')
    localStorage.setItem('workoutDate', getDate())
    setStartedWorkout(localStorage.getItem('workoutStatus'))
    let response = await startWorkout()
  }



  return (
    <div>
      <div className='workout-header'>
        <p className='title'>{ workout['target'] && displayWorkoutTarget() }</p>
        <p className='date'>{ `${currentDay()}, ${getDate()}` }</p>
        <p>Calender</p>
      </div>
      {/*<Timer />*/}
      <ExerciseList />
      {startedWorkout ? <h1>Keep Going!</h1> : <button onClick={beginWorkout}>Start</button> }
    </div>
  );
};

export default TodaysWorkout;
