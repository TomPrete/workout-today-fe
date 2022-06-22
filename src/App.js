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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/today' element={<TodaysWorkout />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
