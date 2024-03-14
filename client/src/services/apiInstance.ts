import type { AxiosError } from 'axios';
import axios from 'axios';
import { store, type StoreT } from '../redux/store';
import authService from './authService';

// accessToken
const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// let store: StoreT | undefined;

// export const injectStore = (_store: StoreT): void => {
//   store = _store;
// };

// Перехватчик запроса
apiInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store.getState().auth.accessToken}`;
  }
  return config;
});

// Перехватчик ответа

apiInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    const prevRequest = err.config; // необходимо чтобы понять что это второй запрос
    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { accessToken } = await authService.refresh();
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiInstance(prevRequest);
    }
    return Promise.reject(err);
  },
);

export default apiInstance;
