import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles if needed
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside Router
root.render(
  <Router>
    <App />
  </Router>
);
