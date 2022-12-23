import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import * as dayjs from 'dayjs'

import './WorkoutListStyles.css'

import { WorkoutContext } from '../../contexts/WorkoutContext';

import { getMoreWorkouts } from '../../api/WorkoutAPI';

import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';
import { formatCurrentDate } from '../../helpers/dateHelpers';



const WorkoutList = (props) => {
  const { pastWorkouts } = props
  const { dispatch } = useContext(WorkoutContext)
  let navigate = useNavigate();

  const getWorkout = async (date) => {
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

  const displayPastWorkouts = () => {
    return pastWorkouts.map((pastWorkout, idx) => {
      return (
        <div key={idx} className="card-container">
          <div onClick={() => getWorkout(pastWorkout.workout_date)} className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{ capitalizeWorkoutTarget(pastWorkout.workout_target) }</p>
                  <p className="subtitle is-6">{pastWorkout.total_rounds} Round{pastWorkout.total_rounds > 1 ? 's' : ''}</p>
                  <p className="subtitle is-6">{ dayjs(pastWorkout.workout_date).format('MMM DD, YYYY') }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="workout-list">
      {
        displayPastWorkouts()
      }
      <a href='/pricing' alt='upgrade'>
        <button className="button is-warning is-medium is-fullwidth">Upgrade for All Workouts</button>
      </a>
    </div>
  );
};

export default WorkoutList;
