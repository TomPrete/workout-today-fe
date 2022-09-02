import React, { useContext, useEffect, useState } from 'react';
import ExerciseList from '../ExerciseList';
import { currentDay, getDate } from '../../helpers/dateHelpers';
import { getPercentage } from '../../helpers/numHelpers';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import './TodaysWorkout.css'
import { submitWorkoutStatus } from '../../api/WorkoutAPI'
import Button from '../button/Button'
import Loading from '../loading/Loading';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { TimerContext } from '../../contexts/TimerContext';
import ProgressBar from '../progress-bar/ProgressBar';
import Timer from '../Timer';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import Table from '../table/Table';

const TodaysWorkout = () => {
  const [workoutStatus, setWorkoutStatus] = useState(false)
  const [showAbWorkout, setShowAbWorkout] = useState(false)
  const [showExerciseList, setShowExerciseList] = useState(false)
  const { workout } = useContext(WorkoutContext)
  const { user } = useContext(UserAuthContext)
  const { exercise } = useContext(ExerciseContext)
  const { time, startPauseTimer, resetTimer } = useContext(TimerContext)

  useEffect(() => {
    if (localStorage.getItem('workoutStatus') && localStorage.getItem('workoutDate') === getDate()) {
      setWorkoutStatus(localStorage.getItem('workoutStatus'))
    }
  }, [])

  const changeWorkoutStatus = async (status) => {
    if (status == 'finished') {
      resetTimer()
    } else {
      startPauseTimer()
    }
    if (localStorage.getItem('workoutDate') === getDate() && localStorage.getItem('workoutStatus') === "started" && status !== "finished") {
      return
    } else {
      let response = await submitWorkoutStatus(status)
    }
    submitWorkoutStatus(status)
    localStorage.setItem('workoutStatus', status)
    localStorage.setItem('workoutDate', getDate())
    setWorkoutStatus(localStorage.getItem('workoutStatus'))
  }

  if (workout['loading']) {
    return (
      <Loading />
    )
  }

  const percentageCompleted = () => {
    return showAbWorkout ? getPercentage(exercise.abIdx, workout.ab_exercises.length) : getPercentage(exercise.exerciseIdx, workout.exercises.length)
  }

  return (
    <div>
      <div className='workout-header'>
        <div className='date-container'>
          <div className='weekday'>{ currentDay() }</div>
          <div className='date'>{ getDate() }</div>
        </div>
        <p onClick={() => setShowExerciseList(!showExerciseList)} className='title-workout'>{!showAbWorkout ? workout['target'] : "Abs"}</p>
        <div className='rounds'>{`x${workout['rounds']} Round${workout['rounds'] > 1 ? 's' : ''}`}</div>
      </div>
      {
        showExerciseList
        &&
        <div className="exercise-table-container">
          <Table data={ { workout, showAbWorkout } } />
        </div>
      }
      <ProgressBar bgcolor={'#37B6F8'} completed={ percentageCompleted() } />
      <Timer showPauseButton={false} />
      <ExerciseList changeWorkoutStatus={changeWorkoutStatus} showAbWorkout={showAbWorkout} />
      <div className='workout-bottom'>
        <Button
          className='ab-button'
          title={!showAbWorkout ? 'Ab Workout' : workout['target']}
          onClick={() => setShowAbWorkout(!showAbWorkout)}
        />
        <Button
          className='start'
          title={time.isPaused ? 'Start' : 'Pause'}
          onClick={() => changeWorkoutStatus('started')}
        />
      </div>
    </div>
  );
};

export default TodaysWorkout;
