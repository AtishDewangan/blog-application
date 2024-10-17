// components/Modal.js
import React from "react";

const Modal = ({ isOpen = false, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg z-50 max-w-lg w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
