// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';
// Import du hook useState pour la gestion du state
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

// Import of Redux store thunks
import actionThunkFetchActivities from '../../store/thunks/thunkFetchActivities';
import actionThunkFetchCategories from '../../store/thunks/thunkFetchCategories';
import actionThunkFetchUser from '../../store/thunks/thunkFetchUser';

// imort of loggedStatus from localStorage
import { getItemLoggedStatusFromLocalStorage } from '../../localStorage/localStorage';

// Import des sous-composants
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import ActivityId from '../ActivityId/ActivityId';
import SessionId from '../SessionId/SessionId';
import Dashboard from '../Dashboard/Dashboard';
import Favorites from '../Favorites/Favorites';
import LandingPage from '../LandingPage/LandingPage';
import SettingsLogedIn from '../Settings/SettingsLogedIn';
import CategoryId from '../Category/CategoryId';
import CategoryList from '../Category/CategoryList';
import History from '../History/History';
import NewSession from '../NewSession/NewSession';
import Login from '../Authentification/Login';
import Signin from '../Authentification/Signin';
import ResetPassword from '../ResetPassword/ResetPassword';

// Import du style
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);

  useEffect(() => {
    // déclencher une action qui va récupérer ce qu'il y a dans le cookie
    // et tenter de faire un get user s'il y un cookie pour récupérer les données
    // utilisateur dans le store
    getItemLoggedStatusFromLocalStorage();

    dispatch(actionThunkFetchCategories());
    dispatch(actionThunkFetchActivities());
    dispatch(actionThunkFetchUser());
  }, [dispatch]);

  // // We check from localStorage if the user is connected
  // const logged = getItemLoggedStatusFromLocalStorage();
  console.log('is user connected?', logged);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {logged && <Route path="/home" element={<Home />} />}
        <Route path="/settings" element={<Settings />} />
        {logged && (
          <Route path="/settings-LogedIn" element={<SettingsLogedIn />} />
        )}
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/:categoryId" element={<CategoryId />} />
        <Route path="/activity/:activityId" element={<ActivityId />} />
        {logged && <Route path="/history/:sessionId" element={<SessionId />} />}
        {logged && <Route path="/dashboard" element={<Dashboard />} />}
        {logged && <Route path="/favorites" element={<Favorites />} />}
        {/* <Route path="/favorites" element={<Favorites />} /> */}
        {logged && <Route path="/history" element={<History />} />}
        {logged && <Route path="/new-session" element={<NewSession />} />}
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
      </Routes>
    </div>
  );
}

export default App;
