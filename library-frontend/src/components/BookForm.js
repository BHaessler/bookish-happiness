// src/components/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './BookForm.css'; // Import your styles

const BookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');  // New state for genre
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/books/`, {
                title,
                author,
                description,
                genre,  // Include genre when sending the data
            });
            onBookAdded(response.data); // Notify parent component
            setTitle('');
            setAuthor('');
            setDescription('');
            setGenre('');  // Reset genre field
        } catch (error) {
            setError('Error adding book');
        }
    };

    return (
        <div className="book-form-container">
            <h2>Add a New Book</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Genre:</label>  {/* New genre input */}
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default BookForm;
