// src/components/AddBook.js
import React from 'react';
import BookForm from './BookForm'; // Import your BookForm component

const AddBook = ({ onBookAdded }) => {
    return (
        <div>
            <h1>Add a New Book</h1>
            <BookForm onBookAdded={onBookAdded} />
        </div>
    );
};

export default AddBook;
