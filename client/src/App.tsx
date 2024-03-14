import React, { useEffect } from 'react';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './components/pages/CharactersPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import charService from './services/charService';
import { setCharacters } from './redux/slices/characters/slice';
import Root from './components/Root';
import MainPage from './components/pages/MainPage';
import type { CharacterType } from './types/character';
import LoginPage from './components/pages/LoginPage';
import { refreshAuth } from './redux/slices/auth/thunks';
import Loader from './components/HOC/Loader';
import PrivateRoute from './components/HOC/PrivateRoute';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    charService
      .getAllChars()
      .then((data) => {
        dispatch(setCharacters(data));
      })
      .catch(console.log);

    void dispatch(refreshAuth());
  }, []);

  const status = useAppSelector((store) => store.auth.user.status);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Loader loading={status === 'unknown'}>
          <Root />
        </Loader>
      ),
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
          element: (
            <PrivateRoute redirect="/login" isAllowed={status === 'logged'}>
              <CharactersPage />
            </PrivateRoute>
          ),
        },
        {
          element: (
            <PrivateRoute
              redirect="/characters"
              isAllowed={status === 'guest'}
            />
          ),
          children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <h1>Signup</h1> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
