import { useEffect, useState } from "react";
import { getGames } from "../utils/storage";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedGames = getGames();
    setGames(storedGames);
  }, []);

  if (games.length === 0) {
    return <p>No games have been added yet.</p>;
  }

  return (
    <div className="home-container">
      <h1>My Game Shelf</h1>
      <div className="game-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            <img src={game.cover} alt={game.title} />
            <h3>{game.title}</h3>
            <p>Status: {game.status}</p>
            <div className="card-actions">
              <Link to={`/game/${game.id}`} className="details-button">
                Game Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;