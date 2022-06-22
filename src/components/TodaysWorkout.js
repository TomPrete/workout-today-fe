import React from 'react';
import ExerciseList from './ExerciseList';
import Timer from './Timer';
import {currentDay, getDate} from '../helpers/dateHelpers';
import WorkoutContextProvider from '../contexts/WorkoutContext';

const TodaysWorkout = () => {
  return (
    <div>
      <WorkoutContextProvider>
        <p>{ `${currentDay()}, ${getDate()}` }</p>
        {/*<Timer />*/}
        <ExerciseList />
      </WorkoutContextProvider>
    </div>
  );
};

export default TodaysWorkout;
