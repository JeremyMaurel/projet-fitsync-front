// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';
// Import du hook useState pour la gestion du state
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

// Import of Redux store thunks
import actionThunkFetchActivities from '../../store/thunks/thunkFetchActivities';
import actionThunkFetchCategories from '../../store/thunks/thunkFetchCategories';

// Import des sous-composants
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import ActivityId from '../ActivityId/ActivityId';
import SessionId from '../SessionId/SessionId';
import Dashboard from '../Dashboard/Dashboard';
import Favorites from '../Favorites/Favorites';
import LandingPage from '../LandingPage/LandingPage';
import SettingsLogedIn from '../Settings/SettingsLogedIn';
import CategoryId from '../CategoryId/CategoryId';
import CategoryList from '../CategoryList/CategoryList';
import History from '../History/History';
import NewSession from '../NewSession/NewSession';
import Login from '../Authentification/Login';
import Signin from '../Authentification/Signin';
import ResetPassword from '../ResetPassword/ResetPassword';

// Import du style
import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  // on recupere islogged dans le state pour conditionner l'affichage de notre route privée /favorites
  const logged = useAppSelector((state) => state.user.logged);

  useEffect(() => {
    dispatch(actionThunkFetchCategories());
    dispatch(actionThunkFetchActivities());
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings-LogedIn" element={<SettingsLogedIn />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/:categoryId" element={<CategoryId />} />
        <Route path="/activity/:activityId" element={<ActivityId />} />
        <Route path="/history/:sessionId" element={<SessionId />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {logged && <Route path="/favorites" element={<Favorites />} />}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/new-session" element={<NewSession />} />
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
      </Routes>
    </div>
  );
}

export default App;

/*
Backup de la route pour categoryID
{categories.map((category) => (
          <Route
            key={category.id}
            path={`/category-list/${category.id}`}
            element={
              <CategoryId
                categoryId={category.id}
                categoryName={category.name}
              />
            }
          />
        ))} */
