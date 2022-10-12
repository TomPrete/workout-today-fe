import React from 'react';
import './Table.css'

const Table = (props) => {
  const { data } = props

  const displayData = () => {
    if (data.showAbWorkout) {
      return data.workout.ab_exercises.map(exercise => {
        return (
          <tr key={exercise.order}>
            <td>{ exercise.order }</td>
            <td>{ exercise.name }</td>
            <td><img src={ exercise.image_url }/></td>
          </tr>
        )
      })
    }
    else {
      return data.workout.exercises.map(exercise => {
        return (
          <tr key={exercise.order}>
            <td>{ exercise.order }</td>
            <td>{ exercise.name }</td>
            <td><img src={ exercise.image_url }/></td>
          </tr>
        )
      })
    }
  }

  return (
    <div>
      <table className="table is-bordered is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Order</th>
          <th>Exercise Name</th>
          <th>Demo</th>
        </tr>
      </thead>
      <tbody>
        {
          displayData()
        }
      </tbody>
      </table>
    </div>
  );
};

export default Table;
