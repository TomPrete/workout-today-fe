import React from 'react';
import './AlertStyles.css';
import AlertCheck from '../../assets/circle-check-regular.svg';
import AlertWarning from '../../assets/circle-exclamation-solid.svg';

const Alert = (props) => {
  const { title, message, type } = props;

  const alertType = () => {
    switch(type) {
      case 'success':
        return 'alert-success'
      case 'error':
        return 'alert-error'
      default:
        return 'alert-success'
    }
  }

  return (
    <div className={`alert-container ${alertType()}`}>
      <img src={`${type === 'error' ? AlertWarning : AlertCheck}`} alt='success-checkmark' className='alert-icon' />
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
