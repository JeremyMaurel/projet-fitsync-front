// Import du composant routes de react-router-dom pour englober nos routes
import { Routes, Route } from 'react-router-dom';

// Import des sous-composants
import Home from '../Home/Home';

// Import du style
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
        <Route path="/test" element={<div>test route ok!</div>} />
      </Routes>
    </div>
  );
}
