import React from 'react';
import './Modal.scss'; // Importamos los estilos

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
