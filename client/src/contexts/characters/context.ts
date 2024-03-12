import { createContext } from 'react';
import type {
  CharacterType,
  CharactersHandlerContextValue,
} from '../../types/character';

export const CharactersContext = createContext<CharacterType[] | null>(null);

export const CharactersHandlersContext =
  createContext<CharactersHandlerContextValue | null>(null);
