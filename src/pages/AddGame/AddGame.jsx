import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGame } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import "./AddGame.scss";

const AddGame = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [status, setStatus] = useState("want to play");
  const [platform, setPlatform] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGame = {
      id: uuidv4(),
      title,
      cover,
      status,
      platform,
      releaseYear,
      createdAt: new Date().toISOString()
    };

    addGame(newGame);
    navigate("/");
  };

  return (
    <div className="add-game-container">
      <h1>Add Game</h1>
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
          <option value="wanna play">Want to Play</option>
          <option value="playing">Playing</option>
          <option value="played">Played</option>
          <option value="abandoned">Abandoned</option>
        </select>

        <label>Platform:</label>
        <input
          type="text"
          required
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <label>Release Year:</label>
        <input
          type="number"
          min="1950"
          max={new Date().getFullYear()}
          required
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddGame;