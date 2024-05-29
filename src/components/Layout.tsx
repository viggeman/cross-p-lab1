import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="container">

    <Navbar />
    {children}
    </div>

   );
}

export default Layout;
