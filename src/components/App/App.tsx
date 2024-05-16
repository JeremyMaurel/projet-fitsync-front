import logo from '../../assets/logo.svg';
import Home from '../Home/Home';
import Header from '../Base/Header/Header';
import Footer from '../Home/Footer';

import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  )};