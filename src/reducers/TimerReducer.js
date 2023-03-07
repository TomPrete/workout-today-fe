export const timerReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': state.isPaused
      }
    case 'PAUSE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': state.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': true
      }
    case 'UNPAUSE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': state.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': false
      }
    case 'RESET_TIME':
      return {
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': action.exerciseSeconds,
        'isPaused': true
      }
    default:
      return state
  }
}

// Chat GTP Generated Code
// const initialState = {
//   seconds: 0,
//   isRunning: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "START":
//       return { seconds: action.payload, isRunning: true };
//     case "STOP":
//       return { ...state, isRunning: false };
//     case "TICK":
//       return { ...state, seconds: state.seconds - 1 };
//     default:
//       return state;
//   }
// }


// Chat GTP Generated Code - Display Timer component
// import { useContext } from "react";
// import { CountdownContext } from "./CountdownContext";

// function CountdownDisplay() {
//   const { state } = useContext(CountdownContext);

//   return <div>{state.seconds}</div>;
// }

// export default CountdownDisplay;

// Chat GTP Generated Code CountDown controller component
// import { useContext, useState } from "react";
// import { CountdownContext } from "./CountdownContext";

// function CountdownController() {
//   const { state, start, stop } = useContext(CountdownContext);
//   const [inputSeconds, setInputSeconds] = useState("");

//   const handleStart = () => {
//     if (inputSeconds.trim() !== "") {
//       start(parseInt(inputSeconds));
//       setInputSeconds("");
//     }
//   };

//   const handleStop = () => {
//     stop();
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         placeholder="Seconds"
//         value={inputSeconds}
//         onChange={(e) => setInputSeconds(e.target.value)}
//       />
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//       <div>{state.isRunning ? "Running" : "Stopped"}</div>
//     </div>
//   );
// }

// export default CountdownController;
