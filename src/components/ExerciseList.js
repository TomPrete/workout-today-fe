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
    return workout['exercises'].map((exercise, idx) => {
      return (
          <Exercise key={idx+1} idx={idx} exercise={exercise} totalExercises={workout['exercises'].length} onClick={updateIdx} isVisible={currentIdx === idx} />
        )
    })
  }

  if (workout['error']) {
    return (
      <div>
        There was an error
      </div>
    )
  }
  return (
    <div>
      <div>
        { workout['exercises'].length > 0 && displayExercises() }
      </div>
    </div>
  );
};

export default ExerciseList;
