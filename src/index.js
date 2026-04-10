import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext'; // ✅ ADD THIS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LanguageProvider>   {/* ✅ WRAP HERE */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);