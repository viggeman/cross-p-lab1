import styles from './Navbar.module.scss';
import Link from 'next/link';
import Modal from 'src/components/Modal/Modal';
import { useActiveModal } from 'src/components/contexts/ModalContext';

const Navbar: React.FC = () => {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <Modal isOpen={activeModal === 'instructions'} onClose={() => setActiveModal('')}>
        <h1>Testar</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ullam consequuntur
          magnam iste tempore esse debitis, dolorum possimus vitae quae rem, dolorem cupiditate
          expedita dolor. Similique distinctio obcaecati sit consequatur?
        </p>
      </Modal>
      <nav className={styles.navbar}>
        <Link href={'/'}>
          <h2>HEPP</h2>
        </Link>
        <ul>
          <Link href={'/recipes'}>
            <li>Recipes</li>
          </Link>
          <li>
            <button onClick={() => setActiveModal('instructions')}>Test</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
