// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';

// Import des sous-composants
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import SettingsLogedIn from '../Settings/SettingsLogedIn';
import CategoryId from '../CategoryId/CategoryId';
import CategoryList from '../CategoryList/CategoryList';

// Import du style
import './App.scss';

export default function App() {
  return (
    <div className="app">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings-LogedIn" element={<SettingsLogedIn />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/categoryId" element={<CategoryId />} />
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
        <Route path="/test" element={<div>test route ok!</div>} />
      </Routes>
    </div>
  );
}
