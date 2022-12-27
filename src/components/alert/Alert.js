import React from 'react';
import './AlertStyles.css';
import AlertCheck from '../../assets/circle-check-regular.svg';

const Alert = (props) => {
  const { title, message } = props
  return (
    <div className='alert-container'>
      <img src={AlertCheck} alt='success-checkmark' className='alert-icon' />
      {
        title
        &&
        <span>{ title }</span>
      }
      <span>{ message }</span>
    </div>
  );
};

export default Alert;
