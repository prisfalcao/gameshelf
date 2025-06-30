import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "../../styles/Container.scss";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container page-container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
