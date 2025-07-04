import CustomButton from "../../components/Button/Button";
import "./NotFound.scss";
import logoEmptyState from "../../assets/logoEmptyState.svg";

const NotFound = () => {
  return (
    <div className="not-found-container" role="main">
      <h1>404</h1>
      <img src={logoEmptyState} alt="GameShelf logo" />
      <p>Oops! The page you're looking for doesn't exist.</p>
      <CustomButton to="/" variant="dark">
        Go back to Home
      </CustomButton>
    </div>
  );
};

export default NotFound;
