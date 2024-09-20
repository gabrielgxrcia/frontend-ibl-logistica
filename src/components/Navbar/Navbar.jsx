import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CirclePlus, Search, Menu } from 'lucide-react';
import { useSearchContext } from '../../contexts/SearchContext';
import PropTypes from 'prop-types';
import './Navbar.css';

// Componente NavLink para links de navegação reutilizáveis
const Navbar = ({ onAddBookClick, onSearch, isSidebarOpen }) => {
    const [activeTab, setActiveTab] = useState('livros');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activeIndicatorRef = useRef(null);
    const navLinksRef = useRef(null);
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, setSearchResults } = useSearchContext();

    // Função para atualizar a posição do indicador ativo
    const updateIndicatorPosition = useCallback(() => {
        const activeLink = navLinksRef.current?.querySelector(`[data-tab="${activeTab}"]`);
        if (activeLink && activeIndicatorRef.current) {
            activeIndicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
            activeIndicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
        }
    }, [activeTab]);

    useEffect(() => {
        updateIndicatorPosition();
    }, [updateIndicatorPosition]);

    // Função para lidar com a pesquisa
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    // Função para lidar com o clique no link da página inicial
    const handleHomeClick = (e) => {
        e.preventDefault();
        setActiveTab('livros');
        setSearchQuery('');
        setSearchResults(null);
        navigate('/');
    };

    // Função para alternar a visibilidade do menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isSidebarOpen ? 'sidebar-open' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-content">
                <button className="menu-toggle" onClick={toggleMenu}>
                    <Menu size={24} />
                </button>
                <div className={`nav-links-container ${isMenuOpen ? 'show' : ''}`}>
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
                    <span className="add-book-text">Adicionar livro</span>
                </button>
            </div>
        </nav>
    );
};

// Definição dos PropTypes
Navbar.propTypes = {
  onAddBookClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired
};

export default Navbar;