import Home from '../Home/Home';

import CategoryList from '../CategoryList/CategoryList';
import CategoryId from '../CategoryId/CategoryId';
import Settings from '../Settings/Settings';
import SettingsLogedIn from '../Settings/SettingsLogedIn';

import './App.scss';

export default function App() {
  return (
    <div className="app">
      {/* <Home />
      <CategoryList />
      <CategoryId />
      <Settings /> */}
      <SettingsLogedIn />
    </div>
  );
}
