// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';
// Import du hook useState pour la gestion du state
import { useEffect, useState } from 'react';

// Import d'axios pour fetch l'api
import axios from 'axios';

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

// Import du style
import './App.scss';

function App() {
  // -- fetchData --
  const fetchData = async () => {
    const response = await axios.get(`https://api.github.com/rate_limit`);
    // const response = await axios.get(`http://localhost:3000/api/v1/categories`);

    console.log('Hello World!');
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings-LogedIn" element={<SettingsLogedIn />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/categoryId" element={<CategoryId />} />
        <Route
          path="/category-list/categoryId/activityId"
          element={<ActivityId />}
        />
        <Route path="/history/sessionId" element={<SessionId />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/new-session" element={<NewSession />} />
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
      </Routes>
    </div>
  );
}

export default App;
