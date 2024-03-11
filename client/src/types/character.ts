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
