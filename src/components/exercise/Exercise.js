import React from 'react';
import './Execise.css'
import leftArrow from '../../left-arrow.png'
import Button from '../button/Button'
import Modal from '../modal/Modal';
import SubscribeEmail from '../subscribe/SubscribeEmail';
import Timer from '../Timer';

const Exercise = (props) => {
  const { exercise, totalExercises, forwardBack, idx, isVisible, changeWorkoutStatus, closeModal, nextExercise } = props;
  // console.log(nextExercise)
  if (isVisible) {
    return (
      <div className="exercise-container">
       { idx !== 0 && <img className="exercise-left-arrow arrow" onClick={() => forwardBack('left')} src={leftArrow} alt='workout' />}
        <p id="exercise-active">{exercise.order} / {totalExercises}</p>
        <p id="exercise-name">{exercise.name}</p>
        {/*<div id="exercise-time">
          <Timer startTime={60} />
    </div>*/}
        <img id="exercise-img" src={"https://gymvisual.com/img/p/6/9/7/5/6975.gif"} alt='workout' />
        {
          idx !== totalExercises - 1
          ?
          <div className="exercise-right-container" onClick={() => forwardBack('right')} >
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
              className='finish'
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
