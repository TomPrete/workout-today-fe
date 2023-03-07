import React, { createContext, useReducer } from 'react'
import { timerReducer } from '../reducers/TimerReducer'

const START_TIME = 2700

export const TimerContext = createContext()

const TimerContextProvider = (props) => {
  const [time, dispatch] = useReducer(timerReducer, {
    startSeconds: START_TIME,
    workoutSeconds: START_TIME,
    exerciseSeconds: 60,
    isPaused: true
  })

  const startPauseTimer = () => {
    if (time.isPaused) {
      dispatch({type: 'UNPAUSE_TIME'})
    } else {
      dispatch({type: 'PAUSE_TIME'})
    }
  }

  const resetTimer = () => {
    dispatch({type: 'RESET_TIMER', START_TIME})
  }

  const calculateTimeRemainingPercentage = (time) => {
    return Math.round(((time.startSeconds - time.workoutSeconds) / time.startSeconds) * 100)
  }

  const calculateTime = (seconds) => {
    let remainingMinutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds - remainingMinutes * 60
    if (remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`
    }

    return [remainingMinutes, remainingSeconds]
  }

  return (
    <TimerContext.Provider value={{time, dispatch, startPauseTimer, calculateTimeRemainingPercentage, calculateTime, resetTimer}}>
      { props.children }
    </TimerContext.Provider>
  )
}

export default TimerContextProvider

// Chat GTP Generated Code
// export function CountdownProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     let intervalId;

//     if (state.isRunning && state.seconds > 0) {
//       intervalId = setInterval(() => {
//         dispatch({ type: "TICK" });
//       }, 1000);
//     }

//     if (state.seconds === 0) {
//       clearInterval(intervalId);
//       dispatch({ type: "STOP" });
//     }

//     return () => clearInterval(intervalId);
//   }, [state.isRunning, state.seconds]);

//   const start = (seconds) => dispatch({ type: "START", payload: seconds });
//   const stop = () => dispatch({ type: "STOP" });

//   return (
//     <CountdownContext.Provider value={{ state, start, stop }}>
//       {children}
//     </CountdownContext.Provider>
//   );
// }
