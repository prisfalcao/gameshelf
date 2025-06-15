import "./Modal.scss";
import CustomButton from "../Button/Button";

const Modal = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText,
  showCancel = false,
  type = "info",
}) => {
  return (
    <div className={`modal ${type}`}>
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <CustomButton onClick={onConfirm} variant="primary">
            {confirmText}
          </CustomButton>
          {showCancel && (
            <CustomButton onClick={onCancel} variant="secondary">
              {cancelText}
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
