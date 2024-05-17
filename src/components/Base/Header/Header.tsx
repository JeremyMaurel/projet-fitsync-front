// import { Menu } from 'react-feather';
import { Settings } from 'react-feather';

// Import du sous-composant menu pour l'ajouter dans le Header
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header--logo">
        <img src="/fitsync-logo.svg" alt="Logo Fitsync" />
      </div>
      <div className="header--icons">
        <Settings />
        {/* <Menu /> */}
        <BurgerMenu />
      </div>
    </header>
  );
}
