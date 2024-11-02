// src/components/AddBook.js
import React from 'react';
import BookForm from './BookForm'; // Import BookForm component

const AddBook = ({ onBookAdded }) => {
    return (
        <div>
            <BookForm onBookAdded={onBookAdded} />
        </div>
    );
};

export default AddBook;
