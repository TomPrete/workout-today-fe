import React from 'react';
import { useNavigate } from "react-router-dom";
import MobileHeader from '../mobile-header/MobileHeader';
import './WorkoutTypePageStyles.css'
import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';

const WorkoutTypePage = () => {
  const navigate = useNavigate()


  const displayWorkoutTarget = () => {
    const muscleTarget = ['chest-back',"shoulders-biceps-triceps","back-biceps","shoulders-chest-triceps","legs-cardio","cardio-core","legs-back","cardio","core","abs"]
    return muscleTarget.map((target, idx) => {
      return (
        <div key={idx} className="m-3 workout-type-card" onClick={() => navigate(`/workouts/${target}`)}>
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
          <div className='workout-target-title'>{ capitalizeWorkoutTarget(target) }</div>
        </div>
      )
    })
  }

  return (
    <div className='workout-type-container'>
      <MobileHeader title='Workouts Types' />
      {
        displayWorkoutTarget()
      }
    </div>
  );
};

export default WorkoutTypePage;
