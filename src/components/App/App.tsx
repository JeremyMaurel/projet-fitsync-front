// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';
// Import du hook useState pour la gestion du state
import { useEffect, useState } from 'react';

// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

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

// Import de l'interface de types
import ICategory from '../../@types/category';

// Import du style
import './App.scss';

function App() {
  // -- state 1 --
  const [categories, setCategories] = useState<ICategory[]>([]);

  // -- fetchCategories --
  const fetchCategories = async () => {
    const response = await instanceAxios.get('/categories');
    console.log(response.data);
    // Afficher le tableau dans l'objet de l'API
    console.log(response.data.data);
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchCategories();
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
        <Route
          path="/category-list"
          element={<CategoryList categories={categories} />}
        />

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
        ))}

        <Route
          path="/category-list/categoryId/:activityId"
          element={<ActivityId />}
        />
        <Route path="/history/:sessionId" element={<SessionId />} />
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
