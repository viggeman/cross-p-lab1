import Navbar from '../Navbar/Navbar';
import { ReactNode } from 'react';
import Overlay from '../Overlay/Overlay';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Overlay />
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
