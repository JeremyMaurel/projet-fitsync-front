// axios/axiosInstanceLogged.js
import axios, { InternalAxiosRequestConfig } from 'axios';

const instanceAxiosLogged = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
});

instanceAxiosLogged.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      const newConfig = { ...config };
      newConfig.headers = newConfig.headers || {};
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
