import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGames } from "../../utils/storage";
import GameCard from "../../components/GameCard/GameCard";
import "./Home.scss";

const Home = () => {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const location = useLocation();

  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("q")?.toLowerCase().trim() || "";
  };

  useEffect(() => {
    const storedGames = getGames();
    setAllGames(storedGames);

    const query = getSearchQuery();

    if (query) {
      const filtered = storedGames.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
      setGames(filtered);
    } else {
      setGames(storedGames);
    }
  }, [location.search]);

  return (
    <>
      <h1>My Game Shelf</h1>

      {allGames.length === 0 ? (
        <div className="no-games-message" role="alert" aria-live="polite">
          <p>No games have been added yet.</p>
        </div>
      ) : games.length === 0 ? (
        <div className="no-games-message" role="alert" aria-live="polite">
          <p>No games match your search.</p>
        </div>
      ) : (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;