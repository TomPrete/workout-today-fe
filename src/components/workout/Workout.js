import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import './Workout.css'
import RightArrow from '../../assets/ui-icons-chevron-right.svg'
import DownArrow from '../../assets/ui-icons-chevron-down.svg'
import EmptyStar from '../../assets/star.svg'
import Star from '../../assets/star-filled.svg'

import { currentDay, getDate } from '../../helpers/dateHelpers';
import { getPercentage } from '../../helpers/numHelpers';

import { submitWorkoutStatus, getMoreWorkouts, favoriteWorkout, getFavoriteWorkout } from '../../api/WorkoutAPI'

import { WorkoutContext } from '../../contexts/WorkoutContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { TimerContext } from '../../contexts/TimerContext';
import { ExerciseContext } from '../../contexts/ExerciseContext';

import ExerciseList from '../exercise-list/ExerciseList';
import Button from '../button/Button'
import Loading from '../loading/Loading';
import ProgressBar from '../progress-bar/ProgressBar';
import Timer from '../timer/Timer';
import Table from '../table/Table';
import BottomNavBar from '../navbar/BottomNavBar';
import Modal from '../modal/Modal';
import WorkoutList from '../workout-list/WorkoutList';
import Favorite from '../favorite/Favorite';
import NavBar from '../navbar/NavBar';

import { formatCurrentDate } from '../../helpers/dateHelpers';

import mixpanel from 'mixpanel-browser';

mixpanel.init('c9b89c7bf5d74371eaa2dbf629c20821', {debug: true});

const Workout = () => {
  const [pathNameKey, setPathNameKey] = useState(null);
  const [workoutStatus, setWorkoutStatus] = useState(false);
  const [showAbWorkout, setShowAbWorkout] = useState(false);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [showMoreWorkouts, setShowMoreWorkouts] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { workout, dispatch } = useContext(WorkoutContext);
  const { user } = useContext(UserAuthContext);
  const { exercise } = useContext(ExerciseContext);
  const { time, startPauseTimer, resetTimer } = useContext(TimerContext);
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  let location = useLocation();

  console.log("TIME: ", time)
  useEffect(() => {
    mixpanel.track('working_out');
    if (localStorage.getItem('workoutStatus') && localStorage.getItem('workoutDate') === getDate()) {
      setWorkoutStatus(localStorage.getItem('workoutStatus'))
    }
    if (searchParams.get('date') >= formatCurrentDate()) {
      navigate(`/today`)
    }
    if (searchParams.get('date') && searchParams.get('date') < formatCurrentDate()) {
      getWorkout(searchParams.get('date'))
    }
  }, [])

  useEffect(() => {
    if (pathNameKey !== location.key) {
      toggleModals()
    }
    if (user.user && user.user.is_premium && !workout.loading) {
      userFavoriteWorkout()
    }
    if (searchParams.get('date') >= formatCurrentDate()) {
      navigate(`/today`)
    }
    setPathNameKey(location.key)
  }, [workout])

  const getWorkout = async (date) => {
    let workout = await getMoreWorkouts(date)
    if (workout.message) {
      dispatch({type: 'GET_EXERCISES_FAILURE'})
      navigate(`/today`)
    } else {
      dispatch({type: 'GET_EXERCISES_SUCCESS', workout})
    }
  }

  const userFavoriteWorkout = async () => {
    let workoutInfo = {
      user: user.user.id,
      workout: workout.workoutId,
    }
    let response = await getFavoriteWorkout(workoutInfo)
    setIsFavorite(response.is_favorite)
  }

  const changeWorkoutStatus = async (status) => {
    if (status === 'finished') {
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
    if (user.user.is_premium) {
      navigate('/workouts')
    } else if (!showMoreWorkouts) {
      if (!workout.pastWorkouts) {
        let pastWorkouts = await getMoreWorkouts()
        dispatch({type: 'GET_PAST_WORKOUTS_SUCCESS', pastWorkouts})
      }
      toggleModals('workouts')
    } else {
      toggleModals('workouts')
    }
  }

  const toggleFavorite = async () => {
    let workoutInfo = {
      user: user.user.id,
      workout: workout.workoutId,
      action: (isFavorite ? 'unfavorite' : 'favorite')
    }
    let response = await favoriteWorkout(workoutInfo)
    if (response.message === 'success') {
      setIsFavorite(!isFavorite)
    }
  }

  const toggleModals = (type = null) => {
    if (type === null) {
      setShowMoreWorkouts(false)
      return setShowExerciseList(false)
    } else if (type === 'workouts') {
      setShowMoreWorkouts(!showMoreWorkouts)
      return setShowExerciseList(false)
    } else if (type === 'exercises') {
      setShowMoreWorkouts(false)
      return setShowExerciseList(!showExerciseList)
    }
  }

  const percentageCompleted = () => {
    return showAbWorkout ? getPercentage(exercise.abIdx, workout.ab_exercises.length) : getPercentage(exercise.exerciseIdx, workout.exercises.length)
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  console.log("USER: ", user)
  if (workout['loading']) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <NavBar />
      <div className='workout-header'>
        <div className='date-container'>
          <div className='weekday'>{ currentDay() }</div>
          <div className='date'>{ getDate() }</div>
        </div>
        <p onClick={() => toggleModals('exercises')} className='title-workout'>{!showAbWorkout ? workout['target'] : "Abs"} <img src={showExerciseList ? DownArrow : RightArrow} alt='open-close-arrow' /></p>
        {
          user.user
          &&
          user.user.is_premium
          &&
          <img onClick={toggleFavorite} src={isFavorite ? Star : EmptyStar } alt='favorite' className='favorite-icon' />
        }
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
          <WorkoutList pastWorkouts={workout.pastWorkouts} toggleModals={toggleModals} />
        </Modal>
      }
      <ProgressBar bgcolor={'#37B6F8'} completed={ percentageCompleted() } />
      <div className='timer-container'>
        <div className='timer'>
          <Timer showPauseButton={false} />
        </div>
        {
          // user.user && user.user.is_premium
          // &&
          // <div className='favorite'>
          //   <Favorite toggleFavorite={toggleFavorite} />
          // </div>
        }
        <div className='rounds'>{`x${workout['rounds']} Round${workout['rounds'] > 1 ? 's' : ''}`}</div>
      </div>
      <ExerciseList changeWorkoutStatus={changeWorkoutStatus} showAbWorkout={showAbWorkout} />
      <div className='workout-bottom'>
      {
        (!user.user || (user.user && !user.user.is_premium))
        &&
        <div>
          <Button
            className='ab-button is-rounded'
            title={!showAbWorkout ? 'Ab Workout' : workout['target']}
            onClick={() => setShowAbWorkout(!showAbWorkout)}
          />
        </div>
      }
        <div className={`start-button-container ${user.user && user.user.is_premium ? 'large-button' : ''}`}>
          <Button
            className='start is-rounded'
            title={time.isPaused ? 'Start' : 'Stop'}
            onClick={() => changeWorkoutStatus('started')}
          />
        </div>
        {
          (!user.user || (user.user && !user.user.is_premium))
          &&
          <div>
            <Button
              className='ab-button is-rounded'
              title="More Workouts"
              onClick={user.user ? getPreviousWorkouts : navigateToLogin} />
            </div>
        }
        </div>
      {
        user.user
        &&
        <BottomNavBar />
      }
    </div>
  );
};

export default Workout;
