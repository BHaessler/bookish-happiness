import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api'; // Make sure this points to the correct base URL
import './BookForm.css';

const BookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    // Fetch authors when the component mounts
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/authors/`);
                setAuthors(response.data); // Set authors to the state
            } catch (error) {
                console.error('Error fetching authors:', error);
                setError('Error fetching authors');
            }
        };

        fetchAuthors();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/books/`, {
                title,
                author: author,  // Send the author's ID
                description,
                genre,  // Send the genre as a string
            });
            onBookAdded(response.data);  // Notify parent component
            setTitle('');
            setAuthor('');
            setDescription('');
            setGenre('');
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
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                >
                    <option value="">Select Author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Genre:</label>
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                >
                    <option value="">Select Genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="non_fiction">Non-Fiction</option>
                    <option value="sci_fi">Sci-Fi</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="biography">Biography</option>
                    <option value="mystery">Mystery</option>
                </select>

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default BookForm;
