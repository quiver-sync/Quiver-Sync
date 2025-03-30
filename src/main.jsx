import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext';
import { LoadScript } from '@react-google-maps/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
  </React.StrictMode>
);
