import { useEffect, useState } from "react";
import { getGames } from "../../utils/storage";
import GameCard from "../../components/GameCard/GameCard";
import "./Home.scss";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedGames = getGames();
    setGames(storedGames);
  }, []);

  if (games.length === 0) {
    return (
      <div className="no-games-message" role="alert" aria-live="polite">
        <p>No games have been added yet.</p>
      </div>
    );
  }

  return (
    <>
      <h1>My Game Shelf</h1>
      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  );
};

export default Home;
