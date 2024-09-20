import { CirclePlus, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import './Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ onAddBookClick, onSearch }) => {
    const [activeTab, setActiveTab] = useState('livros');
    const activeIndicatorRef = useRef(null);
    const navLinksRef = useRef(null);
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, setSearchResults } = useSearchContext();

    // Atualiza a posição do indicador ativo
    const updateIndicatorPosition = useCallback(() => {
        const activeLink = navLinksRef.current.querySelector(`[data-tab="${activeTab}"]`);
        if (activeLink && activeIndicatorRef.current) {
            activeIndicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
            activeIndicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
        }
    }, [activeTab]);

    useEffect(() => {
        updateIndicatorPosition();
    }, [updateIndicatorPosition]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        setActiveTab('livros');
        setSearchQuery('');
        setSearchResults(null);
        navigate('/');
    };

    return (

      //Links de navegação
        <nav className="navbar">
            <div className="nav-links-container">
                <div className="nav-links" ref={navLinksRef}>
                    <Link to="/" data-tab="livros" className={activeTab === 'livros' ? 'active' : ''} onClick={handleHomeClick}>Livros</Link>
                    <a href="#" data-tab="em-alta" className={activeTab === 'em-alta' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('em-alta'); }}>Em alta</a>
                    <a href="#" data-tab="lancamento" className={activeTab === 'lancamento' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('lancamento'); }}>Lançamento</a>
                    <div className="active-indicator" ref={activeIndicatorRef}></div>
                </div>
            </div>

            <form onSubmit={handleSearch} className="search-bar">
                <Search size={18} className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Pesquisar livro..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <button className="add-book" onClick={onAddBookClick}>
                <CirclePlus size={16} />
                Adicionar livro
            </button>
        </nav>
    );
};

Navbar.propTypes = {
  onAddBookClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Navbar;