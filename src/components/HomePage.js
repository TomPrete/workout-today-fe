import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserAuthContext } from '../contexts/UserAuthContext';
import NavBar from './navbar/NavBar';

const HomePage = () => {
  const { user } = useContext(UserAuthContext)
  return (
    <div>
      <NavBar />
      <Link to="today">Workout Now</Link>
    </div>
  );
};

export default HomePage;
