import React, { useContext, useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

import './Workout.css'
import RightArrow from '../../assets/ui-icons-chevron-right.svg'
import DownArrow from '../../assets/ui-icons-chevron-down.svg'

import { currentDay, getDate } from '../../helpers/dateHelpers';
import { getPercentage } from '../../helpers/numHelpers';

import { submitWorkoutStatus, getMoreWorkouts } from '../../api/WorkoutAPI'

import { WorkoutContext } from '../../contexts/WorkoutContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { TimerContext } from '../../contexts/TimerContext';
import { ExerciseContext } from '../../contexts/ExerciseContext';

import ExerciseList from '../ExerciseList';
import Button from '../button/Button'
import Loading from '../loading/Loading';
import ProgressBar from '../progress-bar/ProgressBar';
import Timer from '../Timer';
import Table from '../table/Table';
import BottomNavBar from '../navbar/BottomNavBar';
import Modal from '../modal/Modal';
import WorkoutList from '../workout-list/WorkoutList';

const Workout = () => {
  const [workoutStatus, setWorkoutStatus] = useState(false)
  const [showAbWorkout, setShowAbWorkout] = useState(false)
  const [showExerciseList, setShowExerciseList] = useState(false)
  const [showMoreWorkouts, setShowMoreWorkouts] = useState(false)
  const { workout, dispatch } = useContext(WorkoutContext)
  const { user } = useContext(UserAuthContext)
  const { exercise } = useContext(ExerciseContext)
  const { time, startPauseTimer, resetTimer } = useContext(TimerContext)
  let navigate = useNavigate();

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
    let shouldSubmitStatus = localStorage.getItem('workoutDate') === getDate() && localStorage.getItem('workoutStatus') === "started" && status !== "finished"
    if (shouldSubmitStatus) {
      return
    } else {
      let response = await submitWorkoutStatus(status)
    }
    submitWorkoutStatus(status)
    localStorage.setItem('workoutStatus', status)
    localStorage.setItem('workoutDate', getDate())
    setWorkoutStatus(localStorage.getItem('workoutStatus'))
  }

  const getPreviousWorkouts = async () => {
    if (!showMoreWorkouts) {
      if (!workout.pastWorkouts) {
        let pastWorkouts = await getMoreWorkouts()
        dispatch({type: 'GET_PAST_WORKOUTS_SUCCESS', pastWorkouts})
      }
      toggleModals('workouts')
    } else {
      toggleModals('workouts')
    }
  }

  const toggleModals = (type) => {
    if (type === 'workouts') {
      setShowMoreWorkouts(!showMoreWorkouts)
      setShowExerciseList(false)
    }
    if (type === 'exercises') {
      setShowMoreWorkouts(false)
      setShowExerciseList(!showExerciseList)
    }
  }

  const percentageCompleted = () => {
    return showAbWorkout ? getPercentage(exercise.abIdx, workout.ab_exercises.length) : getPercentage(exercise.exerciseIdx, workout.exercises.length)
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
        <p onClick={() => toggleModals('exercises')} className='title-workout'>{!showAbWorkout ? workout['target'] : "Abs"} <img src={showExerciseList ? DownArrow :RightArrow} /></p>
        <div className='rounds'>{`x${workout['rounds']} Round${workout['rounds'] > 1 ? 's' : ''}`}</div>
      </div>
      {
        showExerciseList
        &&
        <Modal closeModal={() => toggleModals('exercises')} >
          <Table data={ { workout, showAbWorkout } } />
        </Modal>
      }
      {
        showMoreWorkouts
        &&
        <Modal closeModal={() => toggleModals('workouts')} >
          <WorkoutList pastWorkouts={workout.pastWorkouts} />
        </Modal>
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
        <Button
          className='ab-button'
          title="More Workouts"
          onClick={user.user ? getPreviousWorkouts : () => navigate('/login')}
        />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Workout;
