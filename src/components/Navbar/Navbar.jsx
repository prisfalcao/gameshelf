import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">Add Game</Link>
      </div>
    </nav>
  );
};

export default Navbar;