import React, { useContext, useState, useEffect } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import './Execise.css'
import leftArrow from '../../left-arrow.png'
import Button from '../button/Button'
import ExerciseInputGroup from '../input/ExerciseInputGroup'
import { submitUserExerciseInfo, getUserExerciseInfo } from '../../api/WorkoutAPI';

const Exercise = (props) => {
  const { exercise, totalExercises, forwardBack, idx, isVisible, changeWorkoutStatus, closeModal, nextExercise, workoutId } = props;
  const [reps, setReps] = useState(0)
  const [resistance, setResistance] = useState('')
  const { user } = useContext(UserAuthContext)

  const videoGif = (source) => {
    if (source.includes('.gif')) {
      return (
        <img id="exercise-img" src={source} alt='workout' />
      )
    }
    if (source.includes('.mp4')) {
      return (
        <video width="auto" height="auto" autoPlay muted loop playsInline id="exercise-img">
            <source src={source} type="video/mp4"/>
        </video>
      )
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (user.user && user.user.is_premium) {
      if (reps) {
        let response = await submitUserExerciseInfo({
          reps: reps,
          resistance: resistance,
          workoutId: workoutId,
          exerciseId: exercise.id,
          userId: user.user.id
        })
        let data = await response
        console.log(data)
      }
    }
    return forwardBack('right')
  }

  const updateReps = (evt) => {
    setReps(evt.target.value)
  }

  const updateResistance = (evt) => {
    setResistance(evt.target.value)
  }
  if (isVisible) {
    return (
      <div className="exercise-container">
       {
        idx !== 0 &&
        <img
          className="exercise-left-arrow arrow"
          onClick={() => forwardBack('left')}
          src={leftArrow} alt='workout'
          />
        }
        <p id="exercise-quantity">{ exercise.quantity }</p>
        <p id="exercise-active">{ exercise.order } / { totalExercises }</p>
        <p id="exercise-name">{ exercise.name }</p>
        {
          videoGif(exercise.image_url)
        }
        {
          user.user
          &&
          user.user.is_premium
          &&
          <ExerciseInputGroup
            updateReps={updateReps}
            updateResistance={updateResistance}
            exercise={exercise}
            workoutId={workoutId}
            />
        }
        {
          idx !== totalExercises - 1
          &&
          <div className="exercise-right-container" onClick={handleSubmit} >
            <img className="exercise-right-arrow arrow" src={leftArrow} alt='workout' />
            {
              nextExercise
              &&
              <p>Next: { nextExercise.name }</p>
            }
          </div>
        }
        {
          idx === totalExercises - 1
          &&
          localStorage.getItem('workoutStatus') !== 'finished'
          &&
          <div className="exercise-finish">
            <Button
              className='finish'
              title="Finish"
              onClick={() => changeWorkoutStatus('finished')}
              />
          </div>
        }
        {
          localStorage.getItem('workoutStatus') === 'finished'
          &&
          idx === totalExercises - 1
          &&
          <div className="exercise-right-container">
            <p>Great Job!</p>
          </div>
        }
        </div>
    );
  }
};

export default Exercise;
