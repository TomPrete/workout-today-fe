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
import PricingTable from './components/pricing/PricingTable';
import AccountHome from './components/account/AccountHome';
import { userAuthReducer } from './reducers/UserAuthReducer';
import BottomNavBar from './components/navbar/BottomNavBar';


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
                    <Route path='/pricing' element={<PricingTable />} />
                    <Route path='/account' element={<AccountHome />} />
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
