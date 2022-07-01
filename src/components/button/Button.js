import React from 'react';
import './Button.css'

const Button = (props) => {
  const { title, onClick, className } = props
  return (
    <div className={`button-container`}>
      <button className={`button ${className}`}  onClick={ onClick }>{ title }</button>
    </div>
  );
};

export default Button;
