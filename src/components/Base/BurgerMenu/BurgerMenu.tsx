import { fallDown as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { actionLogOut } from '../../../store/reducers/userReducer';

import './BurgerMenu.scss';

export default function BurgerMenu() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(actionLogOut());
  };

  return (
    // Adding in props de Menu son pl
    <Menu right width={'100%'} customBurgerIcon={<img src="/menu-icon.svg" />}>
      <Link className="menu-item" to="/home">
        Home
      </Link>
      <Link className="menu-item" to="/dashboard">
        Dashboard
      </Link>
      <Link className="menu-item" to="/category-list">
        Categories
      </Link>
      <Link className="menu-item" to="/new-session">
        New Session
      </Link>
      <Link className="menu-item" to="/history">
        History
      </Link>
      <Link className="menu-item" to="/favorites">
        Favorites
      </Link>
      <Link className="menu-item" to="/support">
        Contact support
      </Link>
      <Link className="menu-item" to="/" onClick={handleLogout}>
        Logout
      </Link>
    </Menu>
  );
}

// Based on the library 'react-burger-menu'. Documentation: https://github.com/negomi/react-burger-menu/blob/main/README.md
