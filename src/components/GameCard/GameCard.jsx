import CustomButton from "../Button/Button";
import "./GameCard.scss";

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <div className="image-container">
                <img src={game.cover} alt={game.title} />
            </div>
            <h3>{game.title}</h3>
            <div className="text-info">
                <p>Status: {game.status}</p>
                <p>Platform: {game.platform}</p>
            </div>
            <div className="card-actions">
                <CustomButton to={`/game/${game.id}`} variant="secondary">Game details</CustomButton>
            </div>
        </div>
    );
};

export default GameCard;
