// src/pages/GameDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameById, updateGame, removeGame } from "../../utils/storage";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const foundGame = getGameById(id);
    if (!foundGame) {
      navigate("/");
    } else {
      setGame(foundGame);
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateGame(game);
    navigate("/");
  };

  const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete this game?")) {
    removeGame(id);
    navigate("/");
  }
};

  if (!game) return <p>Loading...</p>;

  return (
    <div className="game-details">
      <h1>Edit Game</h1>
      <form onSubmit={handleUpdate}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={game.title}
          onChange={handleChange}
        />

        <label>Cover URL:</label>
        <input
          type="url"
          name="cover"
          value={game.cover}
          onChange={handleChange}
        />

        <label>Status:</label>
        <select name="status" value={game.status} onChange={handleChange}>
          <option value="want to play">Want to Play</option>
          <option value="playing">Playing</option>
          <option value="played">Played</option>
          <option value="abandoned">Abandoned</option>
        </select>

        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ marginLeft: "10px", backgroundColor: "#e74c3c", color: "#fff" }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default GameDetails;