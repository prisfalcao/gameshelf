import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import "../../styles/Container.scss";
import logoImg from "../../assets/logoImg.svg";
import searchIcon from "../../assets/searchIcon.svg";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="GameShelf logo" />
        </Link>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Game</Link></li>
          <li><Link to="/import">Import Game</Link></li>
        </ul>

        <form className="navbar-search" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search for game name"
            aria-label="Game search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <img src={searchIcon} alt="" />
          </button>

        </form>
      </div>
    </nav>
  );
};

export default Navbar;
