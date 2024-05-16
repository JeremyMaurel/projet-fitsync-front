import Home from '../Home/Home';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CategoryList from '../CategoryList/CategoryList';
import CategoryId from '../CategoryId/CategoryId';

import './App.scss';

export default function App() {
  return (
    <div className="app">
      {/* <Home /> */}
      {/* <CategoryList /> */}
      <CategoryId />
    </div>
  );
}
