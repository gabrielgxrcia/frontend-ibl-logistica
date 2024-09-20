import PropTypes from 'prop-types';
import { X, Edit, Trash2 } from 'lucide-react';
import "./BookSidebar.css";

const BookSidebar = ({ book, onClose, onEdit, onDelete, setIsSidebarOpen }) => {
    // Retorna null se não houver livro
  if (!book) return null;

  return (
    <div className="sidebar">
      <button className="closeButton" onClick={() => {
        onClose();
        setIsSidebarOpen(false);
      }}>
        <X />
      </button>
      <h2 className="sidebarTitle">Sobre o livro</h2>
      <div className="bookContent">
        <img src={`http://127.0.0.1:8000/storage/${book.image}`} alt={book.titulo} className="coverImage" />
        <h3 className="bookTitle">{book.titulo}</h3>
        <p className="author">{book.autor}</p>
        <div className="stats">
          <div className="statItem">
            <span className="statLabel">ISBN</span>
            <span className="statValue">{book.isbn}</span>
          </div>
          <div className="statItem">
            <span className="statLabel">EDITORA</span>
            <span className="statValue">{book.editora}</span>
          </div>
          <div className="statItem">
            <span className="statLabel">PÁGINAS</span>
            <span className="statValue">{book.quantidade_paginas}</span>
          </div>
        </div>
        <div className="actions">
          <button className="actionButton editButton" onClick={() => onEdit(book)}>
            <Edit size={18} /> Editar
          </button>
          <button className="actionButton deleteButton" onClick={() => onDelete(book.id)}>
            <Trash2 size={18} /> Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

// Definição dos PropTypes
BookSidebar.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    quantidade_paginas: PropTypes.number.isRequired,
    isbn: PropTypes.string.isRequired,
    editora: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default BookSidebar;