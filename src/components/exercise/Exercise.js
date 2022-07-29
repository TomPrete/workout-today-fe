import React from 'react';
import './Execise.css'
import leftArrow from '../../left-arrow.png'
import Button from '../button/Button'
import Modal from '../modal/Modal';
import SubscribeEmail from '../subscribe/SubscribeEmail';
import Timer from '../Timer';

const Exercise = (props) => {
  const { exercise, totalExercises, forwardBack, idx, isVisible, changeWorkoutStatus, closeModal, nextExercise } = props;

  if (isVisible) {
    return (
      <div className="exercise-container">
       { idx !== 0 && <img className="exercise-left-arrow arrow" onClick={() => forwardBack('left')} src={leftArrow} alt='workout' />}
        <p id="exercise-active">{ exercise.order } / { totalExercises }</p>
        <p id="exercise-name">{ exercise.name }</p>
        <img id="exercise-img" src={"https://gymvisual.com/img/p/6/9/7/5/6975.gif"} alt='workout' />
        {
          idx !== totalExercises - 1
          &&
          <div className="exercise-right-container" onClick={() => forwardBack('right')} >
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
