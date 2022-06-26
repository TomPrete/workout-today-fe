import React from 'react';
import './Button.css'

const Button = (props) => {
  const { title, onClick } = props
  return (
    <div className='button-container'>
      <button className={`button ${title}`}  onClick={ onClick }>{ title }</button>
    </div>
  );
};

export default Button;
