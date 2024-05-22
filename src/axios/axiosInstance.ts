// Import d'axios pour fetch l'api
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export default instanceAxios;
