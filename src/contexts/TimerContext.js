import React, { createContext, useReducer, useEffect } from 'react'
import { timerReducer } from '../reducers/TimerReducer'

const START_TIME = 2700

export const TimerContext = createContext()

const TimerContextProvider = (props) => {
  const [time, dispatch] = useReducer(timerReducer, {
    startSeconds: START_TIME,
    workoutSeconds: START_TIME,
    exerciseSeconds: 60,
    isPaused: false
  })

  const pauseTimer = () => {
    dispatch({type: 'PAUSE_TIME'})
  }

  const calculateTimeRemainingPercentage = (time) => {
    return Math.round(((time.startSeconds - time.workoutSeconds) / time.startSeconds) * 100)
  }

  return (
    <TimerContext.Provider value={{time, dispatch, pauseTimer, calculateTimeRemainingPercentage}}>
      { props.children }
    </TimerContext.Provider>
  )
}

export default TimerContextProvider
