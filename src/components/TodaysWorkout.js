import React from 'react';
import ExerciseList from './ExerciseList';
import Timer from './Timer';
import {currentDay, getDate} from '../helpers/dateHelpers';

const TodaysWorkout = () => {
  return (
    <div>
      <p>{ `${currentDay()}, ${getDate()}` }</p>
      {/*<Timer />*/}
      <ExerciseList />
    </div>
  );
};

export default TodaysWorkout;
