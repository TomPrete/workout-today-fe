import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { WorkoutContext } from '../contexts/WorkoutContext';
import Exercise from './exercise/Exercise';
import Timer from './Timer';

const ExerciseList = () => {
  const { workout } = useContext(WorkoutContext)


  const displayExercises = () => {
    return workout.map((exercise, idx) => {
      return (
          <Exercise key={idx+1} exercise={exercise} totalExercises={workout.length} />
        )
    })
  }

  return (
    <div>
      <Carousel emulateTouch showThumbs={false} showStatus={false}>
        { workout && displayExercises() }
      </Carousel>
    </div>
  );
};

export default ExerciseList;
