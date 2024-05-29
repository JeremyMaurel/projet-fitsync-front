/* eslint-disable no-console */
// Importation des librairies ou composants techniques
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import actionCheckLogin from '../thunks/actionCheckLogin';
// Import of localStorage addLoggedStatusToLocalStorage
import { addLoggedStatusToLocalStorage } from '../../localStorage/localStorage';

// --- L'ÉTAT INITIAL ET SON TYPE
interface UserState {
  logged: boolean;
  credentials: {
    pseudo: string;
    password: string;
  };
  email: null | string;
  token: null | string;
  error: null | string;
  id: null | string;
  role: null | string;
  birthdate: null | string;
  gender: null | string;
  height: null | number;
  weight: null | number;
  objective: null | number;
}

const initialState: UserState = {
  logged: false,
  // Ici les emplacements pour contrôler les inputs du formulaire de login
  credentials: {
    pseudo: '',
    password: '',
  },
  email: '',
  token: '',
  error: '',
  id: '',
  role: '',
  birthdate: '',
  gender: '',
  height: null,
  weight: 70,
  objective: null,
};

// -- ACTION CREATORS --
export const actionChangeCredential = createAction<{
  name: 'pseudo' | 'password';
  value: string;
}>('user/CHANGE_CREDENTIAL');

// Cette action est dispatchée au clic sur le bouton de déconnexion
export const actionLogOut = createAction('user/LOGOUT');

// Cette action est dispatchée si, au chargement de l'App, il y a un token dans le localStorage pour se connecter
export const actionCheckLogIn = createAction<{ jwt: string; pseudo: string }>(
  'user/LOGIN'
);

// Action pour aller chercher les infos du profil du User
export const actionGetUserProfile = createAction<{
  id: string;
  email: string;
  pseudo: string;
  role: string;
  password: string;
  birthdate: string;
  gender: string;
  height: number;
  weight: number;
  objective: number;
}>('user/FETCH_USER');

// -- REDUCER --
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      actionChangeCredential,
      (
        state,
        action: PayloadAction<{ name: 'pseudo' | 'password'; value: string }>
      ) => {
        // Quand je reçois la demande 'changer les credentials'
        // il me faut le nom du champ à modifier (soit email soit password)
        // et aussi la nouvelle valeur
        // -> on va chercher ces deux infos dans le payload de l'action
        state.credentials[action.payload.name] = action.payload.value;
      }
    )
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      // Le thunk a bien fait la requête vers /login, il a récupéré le pseudo et le token, il les a ajoutés au payload de l'action, je vais les enregistrer dans le state
      state.logged = true;
      // On stocke le token JWT qui sert d'authentification, il faudra le renvoyer dans les en-têtes des requêtes où on demande des données privées
      state.token = action.payload.token;
      state.error = null;
      addLoggedStatusToLocalStorage('yes');
    })
    .addCase(actionCheckLogin.rejected, (state) => {
      state.error =
        'Connection refused, please check your pseudo and password inputs';
    })
    .addCase(actionLogOut, (state) => {
      // Passer logged à false dans le state
      state.logged = false;
      // Supprimer le pseudo et le token
      state.credentials.pseudo = '';
      state.credentials.password = '';
      state.token = null;
      state.error = null;
      // retirer le loggedStatus du localStorage
      addLoggedStatusToLocalStorage('');
    })
    .addCase(
      actionGetUserProfile,
      (
        state,
        action: PayloadAction<{
          id: string;
          email: string;
          pseudo: string;
          role: string;
          password: string;
          birthdate: string;
          gender: string;
          height: number;
          weight: number;
          objective: number;
        }>
      ) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.credentials.pseudo = action.payload.pseudo;
        state.role = action.payload.role;
        state.credentials.password = action.payload.password;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.weight = action.payload.weight;
        state.objective = action.payload.objective;
      }
    );
});

export default userReducer;

/*
.addCase(
      actionGetUserProfile,
      (
        state,
        action: PayloadAction<{
          id: string;
          email: string;
          pseudo: string;
          role: string;
          password: string;
          birthdate: string;
          gender: string;
          height: number;
          weight: number;
          objective: number;
        }>
      ) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.credentials.pseudo = action.payload.pseudo;
        state.role = action.payload.role;
        state.credentials.password = action.payload.password;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.weight = action.payload.weight;
        state.objective = action.payload.objective;
      }
    );
});

*/
