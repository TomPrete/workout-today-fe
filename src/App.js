import React from 'react'
// requires a loader
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import TodaysWorkout from './components/todaysWorkout/TodaysWorkout';
import WorkoutContextProvider from './contexts/WorkoutContext';
import UserAuthContextProvider from './contexts/UserAuthContext';
import ModalContextProvider from './contexts/ModalContext';
import SignUp from './components/registration/SignUp';
import Login from './components/registration/Login';
import TimerContextProvider from './contexts/TimerContext';
import ExerciseContextProvider from './contexts/ExerciseContext';
import Checkout from './components/checkout/Checkout';


function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <TimerContextProvider>
          <ExerciseContextProvider>
          <WorkoutContextProvider>
            <ModalContextProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/today' element={<TodaysWorkout />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/checkout' element={<Checkout />} />
                  </Routes>
                </BrowserRouter>
                </ModalContextProvider>
                </WorkoutContextProvider>
                </ExerciseContextProvider>
        </TimerContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
