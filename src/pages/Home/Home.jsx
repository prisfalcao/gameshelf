import { useEffect, useState } from "react";
import { getGames } from "../../utils/storage";
import GameCard from "../../components/GameCard/GameCard";
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
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
