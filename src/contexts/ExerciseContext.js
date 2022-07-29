import React, { createContext, useReducer } from 'react'
import { exerciseReducer } from "../reducers/ExerciseReducer"
import { WorkoutContext } from './WorkoutContext'

export const ExerciseContext = createContext()

const ExerciseContextProvider = (props) => {
  const [ exercise, dispatch ] = useReducer(exerciseReducer, {
    exerciseIdx: 1,
    abIdx: 1
  })

  return (
    <ExerciseContext.Provider value={{exercise, dispatch}}>
      { props.children }
    </ExerciseContext.Provider>
  )
}

export default ExerciseContextProvider
