import React, { useEffect, useContext, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { getWorkouts, getMoreWorkouts } from '../../api/WorkoutAPI';
import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';
import { formatCurrentDate } from '../../helpers/dateHelpers';
import * as dayjs from 'dayjs'

const WorkoutsPage = (props) => {
  const { user } = useContext(UserAuthContext)
  const { workout, dispatch } = useContext(WorkoutContext)
  let navigate = useNavigate();

  useEffect(() => {

    const getWorkoutsPremium = async () => {
      dispatch({ type: 'GET_EXERCISES_LOADING' })
      const pastWorkouts = await getWorkouts()
      if (pastWorkouts['error']) {
        dispatch({ type: 'GET_EXERCISES_FAILURE', pastWorkouts })
      } else {
        dispatch({ type: 'GET_PAST_WORKOUTS_SUCCESS', pastWorkouts })
      }
    }
    getWorkoutsPremium()
  }, [])

  const getOneWorkout = async (date) => {
    let workout = await getMoreWorkouts(date)
    if (workout) {
      dispatch({type: 'GET_EXERCISES_SUCCESS', workout})
    }
    if (date === formatCurrentDate()) {
      navigate(`/today`)
    } else {
      navigate(`/workout?date=${date}`)
    }
  }

  const displayWorkouts = () => {
    return workout.pastWorkouts.map((pastWorkout, id) => {
      console.log(typeof pastWorkout.workout_date)
      return (
        <div key={id} className="column is-one-quarter">
          <div className="card" onClick={() => getOneWorkout(pastWorkout.workout_date)}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{ capitalizeWorkoutTarget(pastWorkout.workout_target) }</p>
                  <p className="subtitle is-5">{ `${pastWorkout.total_rounds} round${pastWorkout.total_rounds > 1 ? 's' : ''}`}</p>
                  <p className="subtitle is-5">{ dayjs(pastWorkout.workout_date).format('MMM DD, YYYY') }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  if (user.user && user.user.is_premium && workout.pastWorkouts) {
    console.log('workouts: ', workout.pastWorkouts)
    return (
      <div className="columns is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd is-multiline">
        { displayWorkouts() }
      </div>
    );

  }
};

export default WorkoutsPage;
