import axios from 'axios';

// on créé une instance qui contient la base de l'URL de l'api, comme ça pas besoin de la re-écrire à chaque requete
// pour l'instant l'instance ne contient pas de headers autorisation car on est pas connecté
// dès qu'on est connecté on va ajouter les entetes avec le token
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// fonction executée quand on est connecté
export function addTokenJwtToAxiosInstance(token: string) {
  // ajout des headers dans l'instance après création
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// fonction executée quand on se deconnecte -> il faut supprimer le token de l'instance
export function removeTokenJwtFromAxiosInstance() {
  // ajout des headers dans l'instance après création
  axiosInstance.defaults.headers.common.Authorization = '';
}

export default axiosInstance;
