// axios/axiosInstance.js
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
  withCredentials: true,
});

export default instanceAxios;
