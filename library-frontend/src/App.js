// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookList />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;