//src/components/AuthorForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './BookForm.css';  // Import styles for your form if needed

const AuthorForm = ({ onAuthorAdded }) => {
    const [name, setName] = useState('');
    const [biography, setBiography] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Sending POST request to create a new author
            const response = await axios.post(`${API_BASE_URL}/authors/`, {
                name,
                biography,
            });
            onAuthorAdded(response.data); // Notify parent component to update author list
            setName('');  // Reset input fields
            setBiography('');
        } catch (error) {
            setError('Error adding author');
        }
    };

    return (
        <div className="author-form-container">
            <h2>Add a New Author</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Biography:</label>
                <textarea
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                />
                <button type="submit">Add Author</button>
            </form>
        </div>
    );
};

export default AuthorForm;
