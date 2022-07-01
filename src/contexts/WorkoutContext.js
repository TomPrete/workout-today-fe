import React, { createContext, useReducer, useEffect } from 'react'
import { workoutReducer } from '../reducers/WorkoutReducer'
import { getTodaysWorkout } from '../api/WorkoutAPI'

export const WorkoutContext = createContext()

const WorkoutContextProvider = (props) => {
  const [workout, dispatch] = useReducer(workoutReducer, {
    'exercises': [],
    'error': false
  })

  const fetchTodaysWorkout = async () => {
    dispatch({type: 'LOADING'})
    let workout = await getTodaysWorkout()
    if (workout['error']) {
      dispatch({type: 'GET_EXERCISES_FAILURE', workout})
    } else {
      dispatch({type: 'GET_EXERCISES_SUCCESS', workout})
    }
  }

  useEffect(() => {
    fetchTodaysWorkout()
  }, [])

  return (
    <WorkoutContext.Provider value={{workout, dispatch}}>
      { props.children }
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider;
