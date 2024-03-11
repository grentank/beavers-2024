import type { AxiosInstance } from 'axios';
import type {
  AddCharFormData,
  CharacterType,
  RickMortyApiResponse,
} from '../types/character';
import apiInstance from './apiInstance';

class CharacterService {
  constructor(private api: AxiosInstance) {}

  async deleteById(id: CharacterType['id']): Promise<void> {
    const res = await this.api.delete(`/characters/${id}`);
    if (res.status !== 200) return Promise.reject(new Error('Delete error'));
  }

  async getChars(): Promise<CharacterType[]> {
    try {
      const response = await this.api<CharacterType[]>('/characters');
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Server error'));
    }
  }

  async createNewChar(formData: AddCharFormData): Promise<CharacterType> {
    try {
      const res = await this.api.post<CharacterType>('/characters', formData);
      if (res.status === 201) return res.data;
      throw new Error('Not valid status');
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Error creating character'));
    }
  }

  async getFromRickAndMortyApi(): Promise<CharacterType[]> {
    try {
      const response = await this.api<RickMortyApiResponse>(
        'https://rickandmortyapi.com/api/character',
      );
      if (response.status === 200) {
        return response.data.results;
      }
      return [];
    } catch (error) {
      console.log('Api error', error);
      return Promise.reject(new Error('API Err'));
    }
  }
}

const charService = new CharacterService(apiInstance);
export default charService;
