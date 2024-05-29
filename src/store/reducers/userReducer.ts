/* eslint-disable no-console */
// Importation des librairies ou composants techniques
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import actionCheckLogin from '../thunks/actionCheckLogin';

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
}

const initialState: UserState = {
  logged: false,
  // Ici les emplacements pour contrôler les inputs du formulaire de login
  credentials: {
    pseudo: '',
    password: '',
  },
  email: null,
  token: null,
  error: null,
};

// -- ACTION CREATORS --
export const actionChangeCredential = createAction<{
  name: 'pseudo' | 'password';
  value: string;
}>('user/CHANGE_CREDENTIAL');

// Cette action est dispatchée au clic sur le bouton de déconnexion
export const actionLogOut = createAction('user/LOGOUT');

// Cette action est dispatchée si, au chargement de l'App, il y a un token dans le localStorage pour se connecter
export const actionLogIn = createAction<{ jwt: string; pseudo: string }>(
  'user/LOGIN'
);

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
      state.credentials.pseudo = action.payload.pseudo;
      // On stocke le token JWT qui sert d'authentification, il faudra le renvoyer dans les en-têtes des requêtes où on demande des données privées
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(actionCheckLogin.rejected, (state) => {
      state.error =
        'Connection error, please check your pseudo and password inputs';
    })
    .addCase(actionLogOut, (state) => {
      // Passer logged à false dans le state
      // Supprimer le pseudo et le token
      state.logged = false;
      state.credentials.pseudo = '';
      state.credentials.password = '';
      state.token = null;
      state.error = null;
    })
    .addCase(
      actionLogIn,
      (state, action: PayloadAction<{ jwt: string; pseudo: string }>) => {
        // On connecte l'utilisateur
        state.logged = true;
        // On enregistre le token récupéré du payload de l'action
        state.token = action.payload.jwt;
        state.credentials.pseudo = action.payload.pseudo;
        state.error = null;
        console.log(state.token);
      }
    );
});

export default userReducer;
