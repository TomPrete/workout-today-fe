import React from 'react';
import './Execise.css'
import leftArrow from '../../left-arrow.png'
import Button from '../button/Button'
import Modal from '../modal/Modal';
import SubscribeEmail from '../signup/SubscribeEmail';

const Exercise = (props) => {
  const { exercise, totalExercises, onClick, idx, isVisible, changeWorkoutStatus, closeModal, nextExercise, rounds } = props;

  // console.log(nextExercise)
  if (isVisible) {
    return (
      <div className="exercise-container">
      <h3>{`x${rounds} Round${rounds > 1 ? 's' : ''}`}</h3>
       { idx !== 0 && <img className="exercise-left-arrow arrow" onClick={() => onClick('left')} src={leftArrow} alt='workout' />}
        <p id="exercise-active">{exercise.order} / {totalExercises}</p>
        <p id="exercise-name">{exercise.name}</p>
        <img id="exercise-img" src={"https://gymvisual.com/img/p/6/9/7/5/6975.gif"} alt='workout' />
        {
          idx !== totalExercises - 1
          ?
          <div className="exercise-right-container" onClick={() => onClick('right')} >
            <img className="exercise-right-arrow arrow" src={leftArrow} alt='workout' />
            {
              nextExercise
              &&
              <p>Next: { nextExercise.name }</p>
            }
          </div>
          :
          <div className="exercise-finish">
            <Button
              title="Finish"
              onClick={() => changeWorkoutStatus('finished')}
              />
          </div>
        }
        {/*{
          localStorage.getItem('workoutStatus') === "finished"
          &&
          <Modal onClick={closeModal}>
            <SubscribeEmail />
          </Modal>
        }*/}
        </div>
    );
  }
};

export default Exercise;
