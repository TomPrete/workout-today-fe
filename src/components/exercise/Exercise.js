import React from 'react';
import './Execise.css'

const Exercise = (props) => {
  const { exercise, totalExercises } = props;
  return (
    <div class="exercise-container">
      <p id="exercise-active">{exercise.order} / {totalExercises}</p>
      <h3 id="exercise-name">{exercise.name}</h3>
      <img id="exercise-img" src={"https://gymvisual.com/img/p/6/9/7/5/6975.gif"} alt='workout' />
    </div>
  );
};

export default Exercise;
