import { Menu } from 'react-feather';
import { Settings } from 'react-feather';

import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/fitsync-logo.svg" alt="Logo Fitsync" />
      </div>
      <div className="header-icons">
        <Settings />
        <Menu />
      </div>
    </header>
  );
}
