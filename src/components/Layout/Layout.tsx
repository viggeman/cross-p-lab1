import Navbar from "../Navbar/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Navbar />
      <div className="container">
      {children}
      </div>
    </>
   );
}

export default Layout;
