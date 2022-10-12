import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './WorkoutListStyles.css'

import { WorkoutContext } from '../../contexts/WorkoutContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';

import { getMoreWorkouts } from '../../api/WorkoutAPI';

import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';

const WorkoutList = (props) => {
  const { pastWorkouts } = props
  const { workout, dispatch } = useContext(WorkoutContext)
  const { user } = useContext(UserAuthContext)
  let navigate = useNavigate();

  const getWorkout = async (date) => {
    let pastWorkouts = await getMoreWorkouts(date)
    navigate(`/workout?date=${date}`)
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
                  <p className="subtitle is-6">{ pastWorkout.workout_date }</p>
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
    </div>
  );
};

export default WorkoutList;
