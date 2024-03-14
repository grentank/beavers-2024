import React, { useEffect } from 'react';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './components/pages/CharactersPage';
import { useAppDispatch } from './redux/hooks';
import charService from './services/charService';
import { setCharacters } from './redux/slices/characters/slice';
import Root from './components/Root';
import MainPage from './components/pages/MainPage';
import type { CharacterType } from './types/character';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   charService
  //     .getAllChars()
  //     .then((data) => {
  //       dispatch(setCharacters(data));
  //     })
  //     .catch(console.log);
  // }, []);
  const charsLoader = (): Promise<CharacterType[]> =>
    charService.getAllChars().then((data) => {
      dispatch(setCharacters(data));
      return data;
    });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: (
        <>
          <h1>Ошибка</h1>
          <Link to="/">На главную</Link>
        </>
      ),
      children: [
        { path: '/', element: <MainPage /> },
        {
          path: '/characters',
          element: <CharactersPage />,
          loader: charsLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
