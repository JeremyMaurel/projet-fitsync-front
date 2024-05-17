import { fallDown as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import './BurgerMenu.scss';

export default function BurgerMenu() {
  return (
    <Menu right width={'100%'}>
      <Link className="menu-item" to="/">
        Home
      </Link>
      <Link className="menu-item" to="/settings">
        Settings
      </Link>
      <Link className="menu-item" to="/category-list">
        Categories
      </Link>
      <Link className="menu-item" to="/category-list/categoryId">
        Activities
      </Link>
      <Link className="menu-item" to="/test">
        Test
      </Link>
    </Menu>
  );
}

// Based on the library 'react-burger-menu' documentation: https://github.com/negomi/react-burger-menu/blob/main/README.md
