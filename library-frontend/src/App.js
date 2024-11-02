// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import axios from 'axios';
import { API_BASE_URL } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [books, setBooks] = useState([]);
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

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleBookAdded = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    return (
        <Router>
            <nav>
                <Link to="/" className="btn btn-primary m-2">Home</Link>
                <Link to="/add-book" className="btn btn-secondary m-2">Add Book</Link>
            </nav>
            <Routes>
                <Route path="/" element={<BookList books={books} loading={loading} error={error} />} />
                <Route path="/add-book" element={<AddBook onBookAdded={handleBookAdded} />} />
            </Routes>
        </Router>
    );
};

export default App;
