import React from 'react'
// requires a loader
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/home/HomePage';
import Workout from './components/workout/Workout';
import WorkoutContextProvider from './contexts/WorkoutContext';
import UserAuthContextProvider from './contexts/UserAuthContext';
import ModalContextProvider from './contexts/ModalContext';
import SignUp from './components/registration/SignUp';
import Login from './components/registration/Login';
import TimerContextProvider from './contexts/TimerContext';
import ExerciseContextProvider from './contexts/ExerciseContext';
import Checkout from './components/checkout/Checkout';
import WorkoutsPage from './components/workouts/WorkoutsPage';
import WorkoutTypePage from './components/workout-type/WorkoutTypePage';
import PricingPage from './components/pricing/PricingPage';
import AccountHome from './components/account/AccountHome';
import PasswordUpdate from './components/password-update/PasswordUpdate';
import { userAuthReducer } from './reducers/UserAuthReducer';
import BottomNavBar from './components/navbar/BottomNavBar';
import PasswordReset from './components/password-reset/PasswordReset';
import PasswordResetSuccess from './components/password-reset/PasswordResetSuccess';


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
                    <Route path='/today' element={<Workout />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/workout' element={<Workout />} />
                    <Route path='/workouts' element={<WorkoutTypePage />} />
                    <Route path='/workouts/:targetMuscle' element={<WorkoutsPage />} />
                    <Route path='/pricing' element={<PricingPage />} />
                    <Route path='/account' element={<AccountHome />} />
                    <Route path='/account/update-password' element={<PasswordUpdate />} />
                    <Route path='/account/reset-password' element={<PasswordReset />} />
                    <Route path='/reset-password/:id/:uuid' element={<PasswordResetSuccess />} />
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
