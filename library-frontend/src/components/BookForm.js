// src/components/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const BookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/books/`, {
                title,
                author,
                description,
            });
            onBookAdded(response.data); // Notify parent component
            setTitle('');
            setAuthor('');
            setDescription('');
        } catch (error) {
            setError('Error adding book');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;
