import Navbar from '../Navbar/Navbar';
import { ReactNode } from 'react';
import Overlay from '../Overlay/Overlay';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Overlay />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
