// import { Menu } from 'react-feather';
import { Settings } from 'react-feather';
import { Link } from 'react-router-dom';

// Import du sous-composant menu pour l'ajouter dans le Header
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header--logo">
        <Link className="menu-item" to="/home">
          <img src="/fitsync-logo.svg" alt="Logo Fitsync" />
        </Link>
      </div>
      <div className="header--icons">
        <Link className="menu-item" to="/settings">
          <Settings />
        </Link>
        <BurgerMenu />
      </div>
    </header>
  );
}
