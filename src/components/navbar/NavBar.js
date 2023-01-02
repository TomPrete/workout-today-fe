import React, { useState, useContext } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import NavLogo from '../../assets/workout_today_logo.png'
import { logoutUser } from '../../api/UserAuthAPI'
import './NavBarStyles.css';

const NavBar = () => {
  const [isActive, setIsActive] = useState(false)
  const { user, dispatch } = useContext(UserAuthContext)


  const logout = async () => {
    let response = await logoutUser()
    if (response['status'] === 200) {
      dispatch({type: 'LOGOUT_USER_SUCCESS'})
    }
  }

  const toggleNavbar = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className='navbar is-fixed-top'>
      <div className='navbar-brand'>
        <a className='navbar-item' href="/">
          <img src={NavLogo} className='logo-img' />
        </a>
        <a role="button" className={`navbar-burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={toggleNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
      {
        user.user
        ?
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="/">Home</a>
            </div>
          <div className="navbar-item">
            <a href="/workouts">Workouts</a>
            </div>
          <div className="navbar-item">
            <a href="/account">Account</a>
          </div>
        </div>
        :
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="https://www.workouttoday.co/ ">Home</a>
          </div>
          <div className="navbar-item">
            <a href="https://www.workouttoday.co/#pricing">Pricing</a>
          </div>
          <div className="navbar-item">
            <a href="/login">Login</a>
          </div>
          <div className="navbar-item">
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      }
      </div>
    </nav>
  );
};

export default NavBar;
