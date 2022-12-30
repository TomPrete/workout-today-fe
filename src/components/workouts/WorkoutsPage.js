import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from '../mobile-header/MobileHeader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { getWorkouts, getMoreWorkouts, getAllUseresFavoriteWorkouts } from '../../api/WorkoutAPI';
import BottomNavBar from '../navbar/BottomNavBar'
import WorkoutOne from '../../assets/workout-1.jpg'
import WorkoutTwo from '../../assets/workout-2.jpg'
import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';
import { formatCurrentDate } from '../../helpers/dateHelpers';
import * as dayjs from 'dayjs'
import './WorkoutPageStyles.css'

const WorkoutsPage = (props) => {
  const { user } = useContext(UserAuthContext)
  const { workout, dispatch } = useContext(WorkoutContext)
  let navigate = useNavigate();
  let { targetMuscle } = useParams();

  useEffect(() => {
    const getWorkoutsPremium = async () => {
      dispatch({ type: 'GET_EXERCISES_LOADING' })
      const pastWorkouts = await getWorkouts(targetMuscle)
      if (pastWorkouts['error']) {
        dispatch({ type: 'GET_EXERCISES_FAILURE', pastWorkouts })
      } else {
        dispatch({ type: 'GET_PAST_WORKOUTS_SUCCESS', pastWorkouts })
      }
    }
    const getUsersFavoriteWorkouts = async (userObj) => {
      dispatch({ type: 'GET_EXERCISES_LOADING' })
      let payload = await getAllUseresFavoriteWorkouts(userObj)
      let pastWorkouts = payload.favoriteWorkouts
      dispatch({ type: 'GET_PAST_WORKOUTS_SUCCESS', pastWorkouts })
    }
    if (user.user) {
      if (targetMuscle === 'favorite') {
        getUsersFavoriteWorkouts({ userId: user.user.id })
      } else {
        getWorkoutsPremium()
      }
    }
  }, [user])

  const getOneWorkout = async (date) => {
    let workout = await getMoreWorkouts(date)
    if (workout) {
      dispatch({ type: 'GET_EXERCISES_SUCCESS', workout })
    }
    if (date === formatCurrentDate()) {
      navigate(`/today`)
    } else {
      navigate(`/workout?date=${date}`)
    }
  }

  const displayWorkouts = (target = null) => {
    return workout.pastWorkouts.map((pastWorkout, id) => {
      console.log("PAST WORKOUT: ", pastWorkout)
      return (
        <div key={id} className="column is-one-quarter workout-card">
          <div className="card" onClick={() => getOneWorkout(pastWorkout.workout_date)}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image card-image">
                    <img src={id % 2 == 0 ? WorkoutOne : WorkoutTwo} alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{capitalizeWorkoutTarget(pastWorkout.workout_target)}</p>
                  <p className="subtitle is-5">{`${pastWorkout.total_rounds} round${pastWorkout.total_rounds > 1 ? 's' : ''}`}</p>
                  <p className="subtitle is-5">{dayjs(pastWorkout.workout_date).format('MMM DD, YYYY')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  if (user.user && user.user.is_premium && workout.pastWorkouts) {
    return (
      <div>
        <MobileHeader title={capitalizeWorkoutTarget(targetMuscle)} />
        <div className="columns is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd is-multiline">
          {
            displayWorkouts(targetMuscle)
          }
        </div>
        <BottomNavBar />
      </div>
    );

  }
};

export default WorkoutsPage;
