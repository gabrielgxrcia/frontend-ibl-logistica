import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useSearchContext } from '../../contexts/SearchContext';
import './BookList.css';

const BookList = () => {
  // Obtém funções e dados do contexto do outlet
  const { books, fetchBooks, onBookClick } = useOutletContext();
  // Obtém resultados de pesquisa do contexto de busca
  const { searchResults } = useSearchContext();

  // Efeito para buscar livros ao montar o componente
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Determina quais livros exibir: resultados da pesquisa ou todos os livros
  const displayBooks = searchResults || books;
  
  // Renderiza mensagem se não houver livros para exibir
  if (!displayBooks || displayBooks.length === 0) {
    return (
      <div>
        <div>Nenhum livro encontrado.</div>
        <Link to="/" className="back-to-home-button">Voltar para a Página Inicial</Link>
      </div>
    );
  }
  
  // Garante que estamos trabalhando com um array de livros
  const booksArray = Array.isArray(displayBooks) ? displayBooks : (displayBooks.data || []);

  // Função para renderizar um card de livro individual
  const renderBookCard = (book, index) => (
    <div key={book.id || `book-${index}`} className="book-card" onClick={() => onBookClick(book)}>
      <img src={`http://127.0.0.1:8000/storage/${book.image}`} alt={book.titulo} />
      <div className="book-info">
        <h3>{book.titulo}</h3>
        <p>{book.autor}</p>
        <p>Editora: {book.editora}</p>
        <p>ISBN: {book.isbn}</p>
      </div>
    </div>
  );

  // Função para renderizar uma seção de livros
  const renderBookSection = (title, description, books) => (
    <section className="book-section">
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
      <div className="section-divider"></div>
      <div className="book-grid">
        {books.map(renderBookCard)}
      </div>
    </section>
  );

  // Renderiza resultados da pesquisa ou seções padrão
  if (searchResults) {
    return (
      <div className="book-list-container">
        {renderBookSection("Resultados da busca", "Livros encontrados com base na sua pesquisa.", booksArray)}
      </div>
    );
  } else {
    // Divide os livros em duas seções
    const paraVoceBooks = booksArray.slice(0, 10);
    const madeForYouBooks = booksArray.slice(10);

    return (
      <div className="book-list-container">
        {renderBookSection("Leia agora", "Melhores escolhas para você, atualizado diariamente.", paraVoceBooks)}
        {renderBookSection("Feito para você", "Suas listas de reprodução pessoais, atualizado diariamente.", madeForYouBooks)}
      </div>
    );
  }
};

export default BookList;