import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameById, updateGame, removeGame } from "../../utils/storage";
import "./GameDetails.scss";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = () => {
    removeGame(id);
    navigate("/");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div className="game-details-container">
      <h1>Game Details</h1>

      {showSuccess && <p className="success-message">Game updated successfully!</p>}

      {!isEditing ? (
        <div className="game-card">
          <div className="game-info">
            <img src={game.cover} alt={game.title} />
            <p>Title: {game.title}</p>
            <p>Status: {game.status}</p>
            <p>Platform: {game.platform}</p>
            <p>Release Year: {game.release_year}</p>
          </div>

          <div className="actions">
            <button className="edit" onClick={() => setIsEditing(true)}>Edit Game</button>
            <button className="delete" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="edit-form">
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

          <label>Platform:</label>
          <select name="platform" value={game.platform || ""} onChange={handleChange}>
            <option value="">Select Platform</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PC">PC</option>
            <option value="Other">Other</option>
          </select>

          <label>Release Year:</label>
          <input
            type="date"
            name="year"
            value={game.year || ""}
            onChange={handleChange}
          />

          <div className="actions">
            <button type="submit" className="edit">Save Changes</button>
            <button type="button" className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this game?</p>
            <div className="modal-actions">
              <button className="delete" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;