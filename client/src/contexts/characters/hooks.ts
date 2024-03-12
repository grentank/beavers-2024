import { useContext } from 'react';
import type {
  CharacterType,
  CharactersHandlerContextValue,
} from '../../types/character';
import { CharactersContext, CharactersHandlersContext } from './context';

export function useCharactersContext(): CharacterType[] {
  const context = useContext(CharactersContext);
  if (!context)
    throw new Error(
      'useCharactersContext must be used within a CharactersProvider',
    );
  return context;
}

export function useCharactersHandlers(): CharactersHandlerContextValue {
  const context = useContext(CharactersHandlersContext);
  if (!context)
    throw new Error(
      'useCharactersContext must be used within a CharactersProvider',
    );
  return context;
}
