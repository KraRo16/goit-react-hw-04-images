import { useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ toggleModal, largeImage }) {
  useEffect(() => {
    const handleKeyDown = e => e.code === 'Escape' && this.props.toggleModal();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleBackdropClick = e => {
    e.target === e.currentTarget && this.props.toggleModal();
  };
  return (
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
