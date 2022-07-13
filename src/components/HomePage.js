import React from 'react';
import { Link } from "react-router-dom";
import NavBar from './navbar/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Link to="today">Workout Now</Link>
    </div>
  );
};

export default HomePage;
