import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EditBookModal.css';

const EditBookModal = ({ isOpen, onClose, book, onSubmit }) => {
    // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    quantidade_paginas: '',
    editora: '',
    edicao: ''
  });

  // Atualiza o formulário quando o livro muda
  useEffect(() => {
    if (book) {
      setFormData({
        titulo: book.titulo || '',
        autor: book.autor || '',
        isbn: book.isbn || '',
        quantidade_paginas: book.quantidade_paginas ? book.quantidade_paginas.toString() : '',
        editora: book.editora || '',
        edicao: book.edicao || ''
      });
    }
  }, [book]);

  // Manipula mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Manipula o envio do formulário 
  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      quantidade_paginas: parseInt(formData.quantidade_paginas, 10) || 0
    };
    onSubmit(submittedData);
  };

  // Não renderiza se o modal não estiver aberto
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Editar livro</h2>
        <p>Atualize as informações do livro nos campos abaixo.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="autor">Autor</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantidade_paginas">Número de Páginas</label>
            <input
              type="number"
              id="quantidade_paginas"
              name="quantidade_paginas"
              value={formData.quantidade_paginas}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editora">Editora</label>
            <input
              type="text"
              id="editora"
              name="editora"
              value={formData.editora}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edicao">Edição</label>
            <input
              type="text"
              id="edicao"
              name="edicao"
              value={formData.edicao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Definição dos PropTypes
EditBookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  book: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default EditBookModal;