import React from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

// Constantes
const INITIAL_BOOK_DATA = {
  titulo: '',
  autor: '',
  isbn: '',
  quantidade_paginas: '',
  edicao: '',
  editora: '',
  image: null,
};

const FIELD_LABELS = {
  titulo: 'Título',
  autor: 'Autor',
  isbn: 'ISBN',
  quantidade_paginas: 'Quantidade de páginas',
  edicao: 'Edição',
  editora: 'Editora',
  image: 'Imagem',
};

// Hook personalizado para gerenciar o estado e a lógica do formulário
const useBookForm = (onSubmit) => {
  const [bookData, setBookData] = React.useState(INITIAL_BOOK_DATA);
  const [errors, setErrors] = React.useState({});

  const handleChange = React.useCallback((e) => {
    const { name, value, type, files } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }, []);

  const validateForm = React.useCallback(() => {
    const newErrors = {};
    Object.entries(bookData).forEach(([field, value]) => {
      if (!value) {
        newErrors[field] = `${FIELD_LABELS[field]} é obrigatório`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [bookData]);

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(bookData);
    }
  }, [bookData, onSubmit, validateForm]);

  return { bookData, errors, handleChange, handleSubmit };
};

// Componente para renderizar um campo de formulário
const FormField = React.memo(({ name, value, onChange, error }) => {
  const inputType = name === 'image' ? 'file' : name === 'quantidade_paginas' ? 'number' : 'text';

  return (
    <div className="form-group">
      <label htmlFor={name}>{FIELD_LABELS[name]}</label>
      <input 
        type={inputType}
        id={name}
        name={name}
        value={inputType !== 'file' ? value : undefined}
        onChange={onChange}
        accept={inputType === 'file' ? 'image/*' : undefined}
        required
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
});

FormField.displayName = 'FormField';

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

// Componente principal BookForm
const BookForm = ({ onSubmit, onCancel }) => {
  const { bookData, errors, handleChange, handleSubmit } = useBookForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-header">
        <h2>Adicionar livro</h2>
        <p className="subtitle">Preencha os detalhes do novo livro</p>
      </div>
      {Object.entries(bookData).map(([key, value]) => (
        <FormField
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          error={errors[key]}
        />
      ))}
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="submit-button">
          Salvar Livro
        </button>
      </div>
    </form>
  );
};

BookForm.displayName = 'BookForm';

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BookForm;