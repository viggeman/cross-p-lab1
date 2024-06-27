import React, { useEffect, ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={`${styles.modalContent} ${isOpen ? styles.slideIn : styles.slideOut}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
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
