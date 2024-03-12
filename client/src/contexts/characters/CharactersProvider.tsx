import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import type {
  AddCharFormData,
  CharacterType,
  CharactersAction,
} from '../../types/character';
import charService from '../../services/characterService';
import { CharactersContext, CharactersHandlersContext } from './context';
import charactersReducer from './reducer';
// import useToggleTranslate from '../translate/hooks';

type CharactersProviderProps = {
  children: JSX.Element;
};

export default function CharactersProvider({
  children,
}: CharactersProviderProps): JSX.Element {
  //   const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [characters, dispatch] = useReducer(charactersReducer, []);
//   const toggle = useToggleTranslate();

  useEffect(() => {
    // charService.getChars().then(setCharacters).catch(console.log);
    charService
      .getChars()
      .then((data) => {
        const action: CharactersAction = { type: 'SET_CHARS', payload: data };
        dispatch(action);
      })
      .catch(console.log);
  }, []);

  const addCharHandler = useCallback(
    async (formData: AddCharFormData): Promise<void> => {
      const newChar = await charService.createNewChar(formData);
      //   setCharacters((prev) => [newChar, ...prev]);
      const action: CharactersAction = { type: 'ADD_CHAR', payload: newChar };
      dispatch(action);
    //   toggle();
    },
    [],
  );

  const handleDelete = useCallback((id: number): void => {
    charService
      .deleteById(id)
      .then(() =>
        // setCharacters((prev) => prev.filter((char) => char.id !== id)),
        dispatch({ type: 'DELETE_CHAR', payload: id } as CharactersAction),
      )
      .catch(console.log);
  }, []);

  const handlersValue = useMemo(
    () => ({
      addHandler: addCharHandler,
      deleteHandler: handleDelete,
    }),
    [],
  );

  return (
    <CharactersContext.Provider value={characters}>
      <CharactersHandlersContext.Provider value={handlersValue}>
        {children}
      </CharactersHandlersContext.Provider>
    </CharactersContext.Provider>
  );
}
