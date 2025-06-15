import { useEffect, useState } from "react";
import { getGames } from "../../utils/storage";
import CustomButton from "../../components/Button/Button";
import './Home.scss';

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
              <CustomButton to={`/game/${game.id}`} variant="secondary">
                Game details
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;