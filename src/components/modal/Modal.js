import React from 'react';
import './Modal.css'

const Modal = (props) => {
  console.log("MODAL")
  const { closeModal } = props
  return (
    <div className="modal" id="modal-one">
      <div className="modal-bg modal-exit"></div>
      <div className="modal-container">
        { props.children }
        <button onClick={closeModal} className="modal-close modal-exit">X</button>
      </div>
    </div>
  );
};

export default Modal;
