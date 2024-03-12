export type CharacterType = {
  id: number;
  name: string;
  alive: boolean; // 'alive' | 'dead'
  image: string;
  type: string;
};

export type RickMortyApiResponse = {
  info: {
    count: number;
    pages: number;
  };
  results: CharacterType[];
};

export type AddCharFormData<T = string> = {
  name: string;
  image: string;
  type: string;
  alive: T;
};

export type DeleteChar = (id: CharacterType['id']) => void;

export type AddChar = (formData: AddCharFormData) => Promise<void>;

export type CharactersHandlerContextValue = {
  deleteHandler: DeleteChar;
  addHandler: AddChar;
};

export type CharactersState = CharacterType[];

export type CharactersAction =
  | {
      type: 'NO_ACTION';
    }
  | {
      type: 'ADD_CHAR';
      payload: CharacterType;
    }
  | {
      type: 'DELETE_CHAR';
      payload: CharacterType['id'];
    }
  | {
      type: 'EDIT_CHAR';
      payload: CharacterType;
    }
  | {
      type: 'CLEAR_ALL_CHARS';
    }
  | {
      type: 'SET_CHARS';
      payload: CharacterType[];
    };
