/*
// Component Overlay
// No props required
// Take in modal context and use activeModal and setActiveModal
// Only visible if activeModal is not ''
// onClick on modal sets activeModal to '' wich makes it invisible again
// Should recide in Layout
*/

import { useActiveModal } from '../contexts/ModalContext';
import styles from './Overlay.module.css';

const Overlay: React.FC = () => {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>{activeModal && <div className={styles.overlay} onClick={() => setActiveModal('')}></div>}</>
  );
};

export default Overlay;
