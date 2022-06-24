import React from 'react';
import './Execise.css'
import leftArrow from '../../left-arrow.png'
import rightArrow from '../../right-arrow.png'

const Exercise = (props) => {
  const { exercise, totalExercises, onClick, idx, isVisible } = props;
  if (isVisible) {
    return (

      <div className="exercise-container">
       { idx !== 0 && <img className="exercise-left-arrow arrow" onClick={() => onClick('left')} src={leftArrow} alt='workout' />}
        <p id="exercise-active">{exercise.order} / {totalExercises}</p>
        <p id="exercise-name">{exercise.name}</p>
        <img id="exercise-img" src={"https://gymvisual.com/img/p/6/9/7/5/6975.gif"} alt='workout' />
        { idx !== totalExercises - 1 && <img className="exercise-right-arrow arrow" onClick={() => onClick('right')} src={leftArrow} alt='workout' />}
        </div>
    );
  }
};

export default Exercise;
