import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { workoutReducer } from '../../reducers/WorkoutReducer';
import MobileHeader from '../mobile-header/MobileHeader';
import './WorkoutTypePageStyles.css'
import { capitalizeWorkoutTarget } from '../../helpers/stringHelpers';
import BottomNavBar from '../navbar/BottomNavBar';
import { getAllUseresFavoriteWorkouts } from '../../api/WorkoutAPI';
import Loading from '../loading/Loading';

const WorkoutTypePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserAuthContext);
  const [workout, dispatch] = useReducer(workoutReducer, workout);

  useEffect(() => {
    const getUsersFavoriteWorkouts = async (userObj) => {
      dispatch({ type: 'GET_EXERCISES_LOADING' })
      let payload = await getAllUseresFavoriteWorkouts(userObj)
      dispatch({type: "GET_FAVORITE_WORKOUTS_SUCCESSS", payload})
      setIsLoading(false)
    }
    if (user.user && user.user.is_premium) {
      setIsLoading(true)
      getUsersFavoriteWorkouts({userId: user.user.id})
    }
  }, [user])

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

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <div className='workout-type-container'>
      <MobileHeader title='Workouts Types' />
      {
        workout
        &&
        workout.totalFavoriteWorkotus
        &&
        <div className={`workout-type ${user.user && user.user.is_premium ? '' : 'show-pricing-link'}`} onClick={() => user.user.is_premium && navigate(`/workouts/favorite`)}>
            <div className='workout-target-title'> <span className="tag is-info is-large">{workout.totalFavoriteWorkotus}</span> Favorite Workouts</div>
        </div>
      }
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
