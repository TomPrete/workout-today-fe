import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="today">Workout Now</Link>
    </div>
  );
};

export default HomePage;
