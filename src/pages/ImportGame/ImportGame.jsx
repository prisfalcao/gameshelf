import { useState } from "react";
import { addGame, getGames } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../components/Button/Button";
import "./ImportGame.scss";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const ImportGame = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [gameStatus, setGameStatus] = useState("Want to play");
  const [selectedPlatform, setSelectedPlatform] = useState("PC");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const fetchGames = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${query}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Failed to fetch games.");
      setResults([]);
    }
  };

  const handleImport = (game) => {
    const existingGames = getGames();

    const alreadyExists = existingGames.some(
        (g) => g.rawgId === game.id
    );

    if (alreadyExists) {
      setError("This game is already on your shelf.");
      setSuccess("");
      return;
    }

    const newGame = {
      id: uuidv4(),
      rawgId: game.id,
      title: game.name,
      cover: game.background_image || "",
      status: gameStatus,
      platform: selectedPlatform,
      releaseYear: new Date(game.released).getFullYear(),
      createdAt: new Date().toISOString(),
    };

    addGame(newGame);
    setError("");
    setShowSuccessModal(true);
  };

  return (
    <div className="import-game-container">
      <h1>Import game from RAWG API</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a game"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CustomButton onClick={fetchGames} variant="primary">
          Search
        </CustomButton>
      </div>

      {showSuccessModal && (
        <Modal
            type="success"
            message="Game imported successfully!"
            onConfirm={() => {
            setShowSuccessModal(false);
            navigate("/");
            }}
        />
        )}


      <div className="status-dropdown">
        <label>Status:</label>
        <select
          value={gameStatus}
          onChange={(e) => setGameStatus(e.target.value)}
        >
          <option value="Want to play">Want to Play</option>
          <option value="Playing">Playing</option>
          <option value="Played">Played</option>
          <option value="Abandoned">Abandoned</option>
        </select>
      </div>

      <div className="platform-dropdown">
        <label>Platform:</label>
        <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
        >
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="SNES">SNES</option>
            <option value="Nintendo Game Boy">Nintendo Game Boy</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Nintendo Switch 2">Nintendo Switch 2</option>
            <option value="PC">PC</option>
            <option value="Other">Other</option>
        </select>
        </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="results">
        {results.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} />
            <div className="info">
              <p><strong>{game.name}</strong></p>
              <p>Released: {game.released || "Unknown"}</p>
              <CustomButton onClick={() => handleImport(game)} variant="success">
                Import
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportGame;