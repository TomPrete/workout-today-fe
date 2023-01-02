import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './BottomNavBar.css'
import Home from '../../assets/home.svg'
import User from '../../assets/user.svg'
import Dumbbell from '../../assets/dumbbell.svg'

const BottomNavBar = (props) => {
  let navigate = useNavigate();

  return (
    <div className='navbar-bottom'>
      <a href='/' className='navbar-button-link'>
        <div className='navbar-button'>
          <img src={Home} alt='Home' className='nav-icon'/>
          <div className='nav-text'>Home</div>
        </div>
      </a>
      <div className='navbar-button' onClick={() => navigate('/workouts')}>
        <img src={Dumbbell} alt='Home' className='nav-icon'/>
        <div className='nav-text'>Workouts</div>
      </div>
      <div className='navbar-button' onClick={() => navigate('/account')}>
        <img src={User} alt='user-account' className='nav-icon'/>
        <div className='nav-text'>Account</div>
      </div>
    </div>
  );
};

export default BottomNavBar;
