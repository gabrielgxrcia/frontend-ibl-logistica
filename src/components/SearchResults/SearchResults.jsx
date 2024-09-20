import { useLocation, Link } from 'react-router-dom';
import BookList from '../BookList/BookList';
import { useSearchContext } from '../../contexts/SearchContext';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const { searchResults } = useSearchContext();

  // Renderiza mensagem quando não há resultados
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="no-results">
        <h2>Nenhum resultado encontrado para: {query}</h2>
        <Link to="/" className="back-button">Voltar para a página inicial</Link>
      </div>
    );
  }

  // Renderiza a lista de livros quando há resultados
  return (
    <div className="search-books">
      <BookList />
    </div>
  );
};

export default SearchResults;