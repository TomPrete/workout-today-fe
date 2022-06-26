import React, { useReducer, createContext } from 'react';
import { modalReducer } from '../reducers/ModalReducer';

export const ModalContext = createContext()

const ModalContextProvider = (props) => {
  const [modal, dispatch] = useReducer(modalReducer)


  return (
    <ModalContext.Provider value={{modal, dispatch}}>
      { props.children }
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
