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


function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <WorkoutContextProvider>
          <ModalContextProvider>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path='/today' element={<TodaysWorkout />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
          </ModalContextProvider>
        </WorkoutContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
