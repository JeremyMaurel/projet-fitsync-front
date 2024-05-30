// axios/axiosInstanceLogged.js
// axios/axiosInstanceLogged.js
import axios from 'axios';

const instanceAxiosLogged = axios.create({
  baseURL: 'http://maureljeremy.me/api/v1',
  withCredentials: true,
});

// instanceAxiosLogged.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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
