import React, { createContext, useReducer, useEffect } from 'react'
import { workoutReducer } from '../reducers/WorkoutReducer'
import { getTodaysWorkout } from '../api/WorkoutAPI'

export const WorkoutContext = createContext()

const WorkoutContextProvider = (props) => {
  const [workout, dispatch] = useReducer(workoutReducer, [])

  const fetchTodaysWorkout = async () => {
    let workout = await getTodaysWorkout()
    dispatch({type: 'GET_EXERCISES', workout})
  }

  useEffect(() => {
    fetchTodaysWorkout()
  }, [])

  return (
    <WorkoutContext.Provider value={{workout, dispatch}}>
      {props.children}
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider;
