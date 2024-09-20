import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Contexto de pesquisa
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // Estados para armazenar os resultados da busca e a consulta
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Provedor de contexto para a busca
  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Definição dos PropTypes
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => useContext(SearchContext);