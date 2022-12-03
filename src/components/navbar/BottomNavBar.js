import React from 'react';
import { useNavigate } from "react-router-dom";
import './BottomNavBar.css'
import Home from '../../assets/home.svg'
import User from '../../assets/user.svg'
import Dumbbell from '../../assets/dumbbell.svg'
import Calendar from '../../assets/calendar.svg'

const BottomNavBar = (props) => {
  let navigate = useNavigate();
  return (
    <div className='navbar-bottom'>
      <a href='/today' className='navbar-button-link'>
        <div className='navbar-button'>
          <img src={Home} alt='Home' className='nav-icon'/>
          <div className='nav-text'>Home</div>
        </div>
      </a>
      <div className='navbar-button' onClick={() => navigate('/workouts')}>
        <img src={Dumbbell} alt='Home' className='nav-icon'/>
        <div className='nav-text'>Workouts</div>
      </div>
      <a href='/account' className='navbar-button-link'>
        <div className='navbar-button' >
          <img src={User} alt='user-account' className='nav-icon'/>
          <div className='nav-text'>Account</div>
        </div>
      </a>
    </div>
  );
};

export default BottomNavBar;
