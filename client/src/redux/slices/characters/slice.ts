import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CharacterStateType,
  CharacterType,
} from '../../../types/character';

const initialState: CharacterStateType = {
  chars: [],
  selectedChar: null,
  favorites: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterType>) => {
      state.chars.unshift(action.payload);
    },
    deleteCharacter: (state, action: PayloadAction<CharacterType['id']>) => {
      //   state.chars = state.chars.filter((char) => char.id !== action.payload);
      const targetIndex = state.chars.findIndex(
        (char) => char.id === action.payload,
      );
      if (targetIndex !== -1) {
        state.chars.splice(targetIndex, 1);
      }
    },
    setCharacters: (state, action: PayloadAction<CharacterType[]>) => {
      state.chars = action.payload;
    },
    setSelectedCharById: (
      state,
      action: PayloadAction<CharacterType['id']>,
    ) => {
      const targetChar = state.chars.find((char) => char.id === action.payload);
      if (targetChar) state.selectedChar = targetChar;
    },
    clearSelectedChar: (state) => {
      state.selectedChar = null;
    },
    editChar: (state, action: PayloadAction<CharacterType>) => {
      const ind = state.chars.findIndex(
        (char) => char.id === action.payload.id,
      );
      if (ind === -1) return;
      state.chars[ind] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearSelectedChar,
  addCharacter,
  setCharacters,
  setSelectedCharById,
  deleteCharacter,
  editChar,
} = charactersSlice.actions;

export default charactersSlice.reducer;
