import React, { useCallback, useEffect, useState } from 'react';
import IndexPage from './components/pages/IndexPage';
import { useAppDispatch } from './redux/hooks';
import charService from './services/charService';
import { setCharacters } from './redux/slices/characters/slice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    charService
      .getAllChars()
      .then((data) => {
        dispatch(setCharacters(data));
      })
      .catch(console.log);
  }, []);
  return (
    <div className="App">
      <IndexPage />
    </div>
  );
}

export default App;
