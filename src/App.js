import React from 'react'
 // requires a loader
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import TodaysWorkout from './components/TodaysWorkout';
import WorkoutContextProvider from './contexts/WorkoutContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WorkoutContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/today' element={<TodaysWorkout />} />
          </Routes>
        </WorkoutContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
