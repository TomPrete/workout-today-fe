import React from 'react';
import './BottomNavBar.css'

const BottomNavBar = (props) => {
  return (
    <div className='navbar-bottom'>
      <a href="#home" className="active">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
    </div>
  );
};

export default BottomNavBar;
