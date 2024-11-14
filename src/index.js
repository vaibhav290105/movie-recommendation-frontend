import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure you have an App component in App.js
import './index.css'; // Optional: Import a CSS file for global styles

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
