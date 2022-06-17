import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { WorkoutContext } from '../contexts/WorkoutContext';
import Exercise from './exercise/Exercise';
import Timer from './Timer';

const ExerciseList = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const { workout } = useContext(WorkoutContext)

  const updateIdx = (direction) => {
    if (direction === "left") {
      setCurrentIdx(currentIdx - 1)
    } else if (direction === "right") {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const displayExercises = () => {
    return workout.map((exercise, idx) => {
      return (
          <Exercise key={idx+1} idx={idx} exercise={exercise} totalExercises={workout.length} onClick={updateIdx} isVisible={currentIdx === idx} />
        )
    })
  }

  return (
    <div>
      <div>
        { workout && displayExercises() }
      </div>
    </div>
  );
};

export default ExerciseList;
