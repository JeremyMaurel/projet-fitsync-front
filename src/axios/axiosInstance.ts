// Import d'axios pour fetch l'api
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://maureljeremy.me/api/v1',
});

export default instanceAxios;
