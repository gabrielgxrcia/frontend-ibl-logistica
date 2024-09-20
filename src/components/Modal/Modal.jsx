import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  // Não renderiza se o modal não estiver aberto
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

// Definição dos PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;