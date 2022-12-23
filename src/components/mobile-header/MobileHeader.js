import React from 'react';
import './MobileHeaderStyles.css'

const MobileHeader = (props) => {
  const { title } = props;
  return (
    <div className='mobile-header-container'>
      <p className='title-workout'>{ title }</p>
    </div>
  );
};

export default MobileHeader;
