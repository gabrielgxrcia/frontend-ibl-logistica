import { useEffect, useState } from 'react';
import api from '../utils/api'; // Verifique se o caminho está correto

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/api/books');
                setBooks(response.data.data); 
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return { books, loading, error };
};
