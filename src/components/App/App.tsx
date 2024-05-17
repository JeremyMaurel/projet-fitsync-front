// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';
// Import du hook useState pour la gestion du state
import { useState } from 'react';

// Import d'axios pour fetch l'api
import axios from 'axios';

// Import des sous-composants
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import CategoryList from '../CategoryList/CategoryList';
import CategoryId from '../CategoryId/CategoryId';

// Import du style
import './App.scss';

export default function App() {
  // -- state 1 -- State des Catégories
  // const [category, setCategory] = useState([]);

  // -- fetchCategory -- fetch de l'api avec axios
  const fetchCategory = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/categories`);
    console.log(response.data);
    // setCategory(response.data);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/categoryId" element={<CategoryId />} />
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
        <Route path="/test" element={<div>test route ok!</div>} />
      </Routes>
    </div>
  );
}
