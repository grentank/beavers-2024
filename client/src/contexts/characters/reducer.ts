import type { CharactersAction, CharactersState } from '../../types/character';

export default function charactersReducer(
  state: CharactersState = [],
  action: CharactersAction,
): CharactersState {
  const { type } = action;
  switch (type) {
    case 'ADD_CHAR':
      return [action.payload, ...state];
    case 'DELETE_CHAR':
      return state.filter((char) => char.id !== action.payload);
    case 'SET_CHARS':
      return action.payload;
    case 'CLEAR_ALL_CHARS':
      return [];
    case 'EDIT_CHAR':
      return state.map((char) =>
        char.id === action.payload.id ? action.payload : char,
      );
    default:
      return state;
  }
}
