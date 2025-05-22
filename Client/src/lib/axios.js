import axios from 'axios';
import baseUrl from '../utility/getBaseUrl';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;