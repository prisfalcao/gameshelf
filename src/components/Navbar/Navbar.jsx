import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/add">Add Game</Link>
    </nav>
  );
};

export default Navbar;