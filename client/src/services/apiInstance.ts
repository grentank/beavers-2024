import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// apiInstance -> fetch

export default apiInstance;
