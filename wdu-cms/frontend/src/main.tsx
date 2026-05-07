import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PageProvider } from './context/PageContext';
import './index.css';

// Load dark mode settings on app start
const loadDarkMode = () => {
  const stored = localStorage.getItem('wdu_dark_mode');
  if (stored) {
    try {
      const isDark = JSON.parse(stored);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Failed to load dark mode settings:', e);
    }
  }
};

// Initialize dark mode before React renders
loadDarkMode();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageProvider>
        <App />
      </PageProvider>
    </BrowserRouter>
  </React.StrictMode>
);