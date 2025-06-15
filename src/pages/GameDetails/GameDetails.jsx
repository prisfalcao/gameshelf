import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameById, updateGame, removeGame, getGames } from "../../utils/storage";
import CustomButton from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./GameDetails.scss";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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
    if (!game.title || !game.cover || !game.platform || !game.releaseYear || game.platform === "") {
      alert("Fill all the mandatory fields.");
      return;
    };

    const existingGames = getGames();

    const alreadyExists = existingGames.some(
      (g) =>
        g.id !== game.id &&
        g.title.toLowerCase().trim() === game.title.toLowerCase().trim() &&
        g.platform.toLowerCase().trim() === game.platform.toLowerCase().trim()
    );

    if (alreadyExists) {
      setShowErrorModal(true);
      return;
    }

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
      <h1>Game details</h1>

      {showSuccess && <p className="success-message">Game updated successfully!</p>}

      {!isEditing ? (
        <div className="game-card">
          <div className="game-info">
            <img src={game.cover} alt={game.title} />
            <p>Title: {game.title}</p>
            <p>Status: {game.status}</p>
            <p>Platform: {game.platform}</p>
            <p>Release Year: {game.releaseYear}</p>
            <p>
              Start Date:{" "}
              {game.startDate
                ? game.startDate.split("-").reverse().join("/")
                : "Not started yet"}
            </p>

          </div>

          <div className="actions">
            <CustomButton onClick={() => setIsEditing(true)} variant="primary">
              Edit game
            </CustomButton>
            <CustomButton onClick={() => setShowDeleteConfirm(true)} variant="danger">
              Delete
            </CustomButton>
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
            <option value="Want to play">Want to Play</option>
            <option value="Playing">Playing</option>
            <option value="Played">Played</option>
            <option value="Abandoned">Abandoned</option>
          </select>

          <label>Platform:</label>
          <select name="platform" value={game.platform || ""} onChange={handleChange}>
            <option value="">Select Platform</option>
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

          <label>Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            min="1970"
            max={new Date().getFullYear()}
            value={game.releaseYear || ""}
            onChange={handleChange}
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            max={new Date().toISOString().split("T")[0]}
            value={game.startDate || ""}
            onChange={handleChange}
          />

          <div className="actions">
            <button type="submit" className="edit">Save Changes</button>
            <button type="button" className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}

      {showDeleteConfirm && (
        <Modal
          message="Are you sure you want to delete this game?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          showCancel={true}
        />
      )}

      {showErrorModal && (
        <Modal
          message="This game already exists on the shelf for this platform."
          onConfirm={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default GameDetails;