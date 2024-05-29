// Import d'axios pour fetch l'api
import axios from 'axios';

const instanceAxiosLogged = axios.create({
  baseURL: 'http://maureljeremy.me/api/v1',
  withCredentials: true,
});

// // fonction executée quand on est connecté
// export function addTokenJwtToAxiosInstance(token: string) {
//   // ajout des headers dans l'instance après création
//   instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
// }

// // fonction executée quand on se deconnecte -> il faut supprimer le token de l'instance
// export function removeTokenJwtFromAxiosInstance() {
//   // ajout des headers dans l'instance après création
//   instanceAxios.defaults.headers.common.Authorization = '';
// }

export default instanceAxiosLogged;
