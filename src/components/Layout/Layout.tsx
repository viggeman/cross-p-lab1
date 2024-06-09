import Navbar from "../Navbar/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Navbar />
      <main className="container">
      {children}
      </main>
    </>
   );
}

export default Layout;
