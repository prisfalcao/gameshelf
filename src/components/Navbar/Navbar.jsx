import CustomButton from "../Button/Button";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <CustomButton to="/" variant="secondary">Home</CustomButton>
        <CustomButton to="/add" variant="secondary">Add Game</CustomButton>
        <CustomButton to="/import" variant="secondary">Import Game</CustomButton>
      </div>
    </nav>
  );
};

export default Navbar;