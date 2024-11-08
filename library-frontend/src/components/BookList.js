// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './BookList.css';  // Import the CSS file
import BookForm from './BookForm'; // Import the BookForm component

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchBooks();
    }, []);

    const handleBookAdded = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="book-list-container">
        <h1>My Books</h1>
        <BookForm onBookAdded={handleBookAdded} />
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default BookList;
