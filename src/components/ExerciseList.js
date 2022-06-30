import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { WorkoutContext } from '../contexts/WorkoutContext';
import Exercise from './exercise/Exercise';
import Timer from './Timer';
import Modal from './modal/Modal';
import SubscribeEmail from './signup/SubscribeEmail';
import { ModalContext } from '../contexts/ModalContext';

const ExerciseList = (props) => {
  const { changeWorkoutStatus, showAbWorkout } = props
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { workout } = useContext(WorkoutContext)
  const { modal } = useContext(ModalContext)

  const updateIdx = (direction) => {
    if (direction === "left") {
      setCurrentIdx(currentIdx - 1)
    } else if (direction === "right") {
      setCurrentIdx(currentIdx + 1)
      if (currentIdx === 10) {
        console.log(currentIdx)
        setShowModal(true)
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }


  const displayExercises = () => {
    if (showAbWorkout) {
      return workout['ab_exercises'].map((exercise, idx) => {
        return (
            <Exercise
              key={idx+1}
              idx={idx}
              exercise={exercise}
              totalExercises={workout['exercises'].length}
              onClick={updateIdx}
              isVisible={currentIdx === idx}
              changeWorkoutStatus={changeWorkoutStatus}
              closeModal={closeModal}
              nextExercise={workout['exercises'].length > idx+1 ? workout['exercises'][idx+1] : null}
              />
          )
      })
    }
    return workout['exercises'].map((exercise, idx) => {
      return (
          <Exercise
            key={idx+1}
            idx={idx}
            exercise={exercise}
            totalExercises={workout['exercises'].length}
            onClick={updateIdx}
            isVisible={currentIdx === idx}
            changeWorkoutStatus={changeWorkoutStatus}
            closeModal={closeModal}
            nextExercise={workout['exercises'].length > idx+1 ? workout['exercises'][idx+1] : null}
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
      {/*{
        showModal
        &&
        <Modal closeModal={closeModal} >
          <SubscribeEmail />
        </Modal>
      }*/}
    </div>
  );
};

export default ExerciseList;
