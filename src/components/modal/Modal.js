import React from 'react';
import './Modal.css'

import Close from '../../assets/icon-x.svg';

const Modal = (props) => {
  console.log("MODAL")
  const { closeModal } = props
  return (
    <div className="modal-test" id="modal-one">
      <div className="modal-container">
        <img src={Close} alt="close" className="close" onClick={closeModal} />
        { props.children }
      </div>
    </div>
  );
};

export default Modal;
