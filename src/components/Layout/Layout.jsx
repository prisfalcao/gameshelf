import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "../../styles/Container.scss";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main role="main" aria-label="Main content area" className="container page-container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
