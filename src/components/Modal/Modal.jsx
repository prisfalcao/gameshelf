import "./Modal.scss";
import CustomButton from "../Button/Button";
import { useEffect, useRef } from "react";

const Modal = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  type = "info",
  title
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal") && showCancel && onCancel) {
      onCancel();
    }
  };

  return (
    <div
      className={`modal ${type}`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackgroundClick}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="modal-content">
        {title && <h2>{title}</h2>}
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
