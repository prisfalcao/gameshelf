import { Link } from "react-router-dom";
import "./Button.scss";

const CustomButton = ({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const className = `custom-button ${variant}`;

  return to ? (
    <Link to={to} className={className} role="button">
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
