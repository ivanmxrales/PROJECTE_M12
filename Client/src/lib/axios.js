import axios from 'axios';
import baseUrl from '../utility/getBaseUrl';

const api = axios.create({
  //baseURL: baseUrl,
  baseURL: 'http://127.0.1:8000', 
  withCredentials: true,
});

export default api;