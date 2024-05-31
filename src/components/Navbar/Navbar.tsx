import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>

      <Link href={'/'}><h2 className={styles['navbar-title']}>HEPP</h2></Link>
      <ul className={styles['navbar-list']}>
        <Link href={'/recipes'}><li className={styles['navbar-item']}>Recipes</li></Link>
      </ul>
    </nav>
  );
};

export default Navbar;
