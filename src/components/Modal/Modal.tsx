import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Delay for animation
  };

  return (
    <>
      {isVisible && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={`${styles.modalContent} ${isOpen ? styles.slideIn : styles.slideOut}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleClose}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
