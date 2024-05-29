// axios/axiosInstance.js
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
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

export default instanceAxios;
