import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = ({ onCloseCart }) => {
  return <div className={classes.backdrop} onClick={onCloseCart} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onCloseCart }) => {
  return (
    <>
      {createPortal(<Backdrop onCloseCart={onCloseCart} />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
