import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameById, updateGame, removeGame } from "../../utils/storage";
import "./GameDetails.scss";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

        <label>Platform:</label>
        <input
          type="text"
          name="platform"
          value={game.platform || ""}
          onChange={handleChange}
        />

        <label>Release Year:</label>
        <input
          type="number"
          name="year"
          value={game.year || ""}
          onChange={handleChange}
        />

        {showSuccess && <p className="success-msg">Changes saved successfully!</p>}

        <div className="actions">
          <button type="button" className="delete" onClick={() => setShowModal(true)}>
            Delete
          </button>
          <button type="submit" className="edit">
            Save Changes
          </button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this game?</p>
            <div className="modal-actions">
              <button className="confirm" onClick={handleDelete}>Yes, delete</button>
              <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;