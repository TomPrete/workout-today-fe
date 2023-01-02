import React, { createContext, useReducer, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { workoutReducer } from '../reducers/WorkoutReducer'
import { getTodaysWorkout, getMoreWorkouts } from '../api/WorkoutAPI'
import { formatCurrentDate } from '../helpers/dateHelpers';

export const WorkoutContext = createContext()

const WorkoutContextProvider = (props) => {
  const [workout, dispatch] = useReducer(workoutReducer, {
    'exercises': [],
    'error': false
  })
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const fetchTodaysWorkout = async () => {
    dispatch({type: 'GET_EXERCISES_LOADING'})
    let workout = await getTodaysWorkout()
    if (workout.error) {
      dispatch({type: 'GET_EXERCISES_FAILURE', workout})
    } else {
      dispatch({type: 'GET_EXERCISES_SUCCESS', workout})
    }
  }

  const getWorkout = async (date) => {
    dispatch({type: 'GET_EXERCISES_LOADING'})
    let workout = await getMoreWorkouts(date)
    if (workout.message) {
      dispatch({type: 'GET_EXERCISES_FAILURE'})
      navigate(`/today`)
    } else {
      dispatch({type: 'GET_EXERCISES_SUCCESS', workout})
    }
  }

  useEffect(() => {
    if (new Date(searchParams.get('date')) > new Date(formatCurrentDate())) {
      navigate(`/today`)
      fetchTodaysWorkout()
    } else if (searchParams.get('date') && searchParams.get('date') < formatCurrentDate()) {
      getWorkout(searchParams.get('date'))
    } else {
      fetchTodaysWorkout()
    }
  }, [])

  return (
    <WorkoutContext.Provider value={{workout, dispatch}}>
      { props.children }
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider;
