import { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import EditBookModal from "./components/EditBookModal/EditBookModal";
import BookForm from "./components/BookForm/BookForm";
import BookSidebar from "./components/BookSidebar/BookSidebar";
import { searchBooks, addBook, getBooks, deleteBook, updateBook } from './services/bookService';
import { SearchProvider, useSearchContext } from './contexts/SearchContext';
import "./styles/global.css";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const { setSearchResults, setSearchQuery } = useSearchContext();
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await getBooks();
      setBooks(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleAddBook = async (bookData) => {
    try {
      const formData = new FormData();
      Object.entries(bookData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      await addBook(formData);
      handleCloseModal();
      await fetchBooks();
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const handleUpdateBook = async (bookData) => {
    try {
      await updateBook(selectedBook.id, bookData);
      handleCloseEditModal();
      await fetchBooks();
      setSelectedBook(null); // Close the sidebar
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await searchBooks(query);
        const results = response.data || [];
        setSearchResults(results);
        navigate(`/search?query=${encodeURIComponent(query)}`);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setSearchResults([]);
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    } else {
      setSearchResults(null);
      navigate('/');
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseSidebar = () => {
    setSelectedBook(null);
  };

  const handleEditBook = () => {
    handleOpenEditModal();
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await fetchBooks();
      setSelectedBook(null);
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  return (
    <main className={`main-content ${selectedBook ? 'sidebar-open' : ''}`}>
      <Navbar onAddBookClick={handleOpenModal} onSearch={handleSearch} />
      <div className="content-area">
        <Outlet context={{ books, fetchBooks, onBookClick: handleBookClick }} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BookForm onSubmit={handleAddBook} onCancel={handleCloseModal} />
      </Modal>
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        book={selectedBook}
        onSubmit={handleUpdateBook}
      />
      <BookSidebar
        book={selectedBook}
        onClose={handleCloseSidebar}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
    </main>
  );
}

function App() {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}

export default App;