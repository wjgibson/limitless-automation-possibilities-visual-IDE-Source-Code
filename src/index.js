import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/index.css';
import MainPage from './App/MainPage.js';
import LoginPage from './App/LoginPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
);
