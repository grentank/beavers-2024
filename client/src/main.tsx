import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharactersProvider from './contexts/characters/CharactersProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CharactersProvider>
    <App />
  </CharactersProvider>,
);
