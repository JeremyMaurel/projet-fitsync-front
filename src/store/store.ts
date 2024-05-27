// Import of librairies or technical components
import { configureStore } from '@reduxjs/toolkit';
// import of reducers
import reducer from './reducers';

const store = configureStore({
  reducer,
});

export default store;

// on exporte le type du state du store et le type de la fonction dispatch du store
// on en aura besoin plus tard pour typer nos hooks useSelector et useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
