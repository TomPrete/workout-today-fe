import React, { useState, useContext } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { WorkoutContext } from '../../contexts/WorkoutContext';
import Exercise from '../exercise/Exercise';
import { ExerciseContext } from '../../contexts/ExerciseContext';

const ExerciseList = (props) => {
  const { changeWorkoutStatus, showAbWorkout } = props
  const [currentIdx, setCurrentIdx] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const { workout } = useContext(WorkoutContext)
  const { exercise, dispatch } = useContext(ExerciseContext)

  const updateIdx = (direction) => {
    let newIdx
    if (direction === "left") {
      newIdx = showAbWorkout ? exercise.abIdx - 1 : exercise.exerciseIdx - 1
    } else if (direction === "right") {
      newIdx = showAbWorkout ? exercise.abIdx + 1 : exercise.exerciseIdx + 1
      if (currentIdx === 10) {
        setShowModal(true)
      }
    }
    if (showAbWorkout) {
      dispatch({type: 'CHANGE_AB_EXERCISE', newIdx})
    } else {
      dispatch({type: 'CHANGE_PRIMARY_EXERCISE', newIdx})
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const displayExercises = () => {
    if (showAbWorkout) {
      return workout['ab_exercises'].map((indExcercise, idx) => {
        return (
            <Exercise
              key={idx+1}
              idx={idx}
              exercise={indExcercise}
              totalExercises={workout['ab_exercises'].length}
              forwardBack={updateIdx}
              isVisible={exercise.abIdx === idx + 1}
              changeWorkoutStatus={changeWorkoutStatus}
              closeModal={closeModal}
              nextExercise={workout['ab_exercises'].length > idx+1 ? workout['ab_exercises'][idx+1] : null}
              workoutId={workout.workoutId}
              />
          )
      })
    }
    return workout['exercises'].map((indExcercise, idx) => {
      return (
          <Exercise
            key={idx+1}
            idx={idx}
            exercise={indExcercise}
            totalExercises={workout['exercises'].length}
            forwardBack={updateIdx}
            isVisible={exercise.exerciseIdx === idx + 1}
            changeWorkoutStatus={changeWorkoutStatus}
            closeModal={closeModal}
            nextExercise={workout['exercises'].length > idx+1 ? workout['exercises'][idx+1] : null}
            workoutId={workout.workoutId}
            />
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
