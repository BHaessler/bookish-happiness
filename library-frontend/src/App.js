import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AuthorForm from './components/AuthorForm'; // Import AuthorForm component
import axios from 'axios';
import { API_BASE_URL } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]); // State for authors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/books/`);
            setBooks(response.data);
        } catch (error) {
            setError('Error fetching books');
        } finally {
            setLoading(false);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/authors/`);
            setAuthors(response.data); // Update authors state with the response
        } catch (error) {
            setError('Error fetching authors');
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchAuthors(); // Fetch authors when the component mounts
    }, []);

    const handleBookAdded = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    const handleAuthorAdded = (newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
    };

    return (
        <Router>
            <nav>
                <Link to="/" className="btn btn-primary m-2">Home</Link>
                <Link to="/add-book" className="btn btn-secondary m-2">Add Book</Link>
                <Link to="/add-author" className="btn btn-success m-2">Add Author</Link> {/* Link to Add Author form */}
            </nav>
            <Routes>
                <Route path="/" element={<BookList books={books} loading={loading} error={error} />} />
                <Route path="/add-book" element={<AddBook onBookAdded={handleBookAdded} />} />
                <Route path="/add-author" element={<AuthorForm onAuthorAdded={handleAuthorAdded} />} /> {/* Route for AuthorForm */}
            </Routes>
        </Router>
    );
};

export default App;
