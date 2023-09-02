import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions'; 
import style from './Modal.module.css'

const Modal = ({ children }) => {
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style['modal-content']}>
        <img src={children.banderaImagen} alt="" />
        <p>{children.name}</p>
        <button onClick={closeModalHandler}>Close</button>
      </div>
    </div>
  );
};

export default Modal;