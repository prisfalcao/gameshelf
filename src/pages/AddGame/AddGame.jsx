import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGames, addGame } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./AddGame.scss";

const AddGame = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [status, setStatus] = useState("want to play");
  const [platform, setPlatform] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !cover || !platform || !releaseYear || platform === "") {
      setErrorMessage("Fill all the mandatory fields.");
      setSuccessMessage("");
      return;
    }

    const existingGames = getGames();

    const alreadyExists = existingGames.some(
      (game) =>
        game.title.toLowerCase().trim() === title.toLowerCase().trim() &&
        game.platform.toLowerCase().trim() === platform.toLowerCase().trim()
    );

    if (alreadyExists) {
      setShowErrorModal(true);
      return;
    }

    const newGame = {
      id: uuidv4(),
      title,
      cover,
      status,
      platform,
      releaseYear: new Date(releaseYear).getFullYear(),
      startDate,
      createdAt: new Date().toISOString(),
    };

    addGame(newGame);
    setErrorMessage("");
    setShowSuccessModal(true);
  };

  return (
    <div className="add-game-container">
      {showSuccessModal && (
        <Modal
          type="success"
          message="Game added successfully!"
          onConfirm={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
        />

      )}
      {showErrorModal && (
        <Modal
          type="error"
          message="This game already exists on the shelf for this platform."
          onConfirm={() => setShowErrorModal(false)}
        />
      )}

      <h1>Add game</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Cover URL:</label>
        <input
          type="url"
          required
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Want to play">Want to Play</option>
          <option value="Playing">Playing</option>
          <option value="Played">Played</option>
          <option value="Abandoned">Abandoned</option>
        </select>

        <label>Platform:</label>
        <select
          required
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
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
          min="1970"
          max={new Date().getFullYear()}
          required
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <CustomButton type="submit" variant="sucess">
          Save
        </CustomButton>
      </form>
    </div>
  );
};

export default AddGame;