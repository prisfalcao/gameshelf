import CustomButton from "../Button/Button";
import "./GameCard.scss";

const GameCard = ({ game, showDetailsButton = true, children }) => {
    return (
        <div className="game-card">
            <div className="image-container">
                <img src={game.cover} alt={game.title} />
            </div>
            <h3>{game.title}</h3>
            <p>Status: {game.status}</p>
            <p>Platform: {game.platform}</p>

            <div className="card-actions">
                {showDetailsButton && (
                    <CustomButton to={`/game/${game.id}`} variant="secondary">
                        Game details
                    </CustomButton>
                )}
                {children}
            </div>
        </div>
    );
};

export default GameCard;
