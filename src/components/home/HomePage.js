import React, { useContext, useReducer, useEffect } from 'react';
import { Link } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { workoutReducer } from '../../reducers/WorkoutReducer';
import NavBar from '../navbar/NavBar';
import BottomNavBar from '../navbar/BottomNavBar';
import MobileHeader from '../mobile-header/MobileHeader';
import './HomePageStyles.css';

const HomePage = () => {
  const { user } = useContext(UserAuthContext)

  return (
    <div>
      <NavBar />
      <MobileHeader title='Home' />
      <div className='home-page'>
        <Link to='/today'  className="home-page-card">
            Today's Workout
        </Link>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default HomePage;
