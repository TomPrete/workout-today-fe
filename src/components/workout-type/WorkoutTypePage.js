import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import MobileHeader from '../mobile-header/MobileHeader';
import './WorkoutTypePageStyles.css'
import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';
import BottomNavBar from '../navbar/BottomNavBar';

const WorkoutTypePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserAuthContext);


  const displayWorkoutTarget = () => {
    const muscleTarget = ['chest-back',"shoulders-biceps-triceps","back-biceps","shoulders-chest-triceps","legs-cardio","cardio-core","legs-back","cardio","core","abs"]
    return muscleTarget.map((target, idx) => {
      return (
        <div key={idx} className={`workout-type ${user.user.is_premium ? '' : 'show-pricing-link'}`} onClick={() => user.user.is_premium && navigate(`/workouts/${target}`)}>
          <div className='workout-target-title'>{ capitalizeWorkoutTarget(target) }</div>
        </div>
      )
    })
  }
  console.log(user)
  return (
    <div className='workout-type-container'>
      <MobileHeader title='Workouts Types' />
      {
        user.user
        &&
        displayWorkoutTarget()
      }
      {
        user.user && !user.user.is_premium
        &&
        <div className="pricing-link m-2">
          <a href='/pricing' alt='upgrade'>
            <button className="button is-large is-fullwidth upgrade-button">Upgrade for All Workouts</button>
          </a>
        </div>
      }
      <BottomNavBar />
    </div>
  );
};

export default WorkoutTypePage;
