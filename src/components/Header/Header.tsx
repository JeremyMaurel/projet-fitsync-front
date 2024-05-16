import { Menu } from 'react-feather';
import { Settings } from 'react-feather';
import { Fragment } from 'react/jsx-runtime';

import './Header.scss';

export default function Header() {
  return (
    <Fragment>
      <div className="header">
        <div className="logo">
          <img src="public/fitsync-logo.svg" alt="Logo Fitsync" />
        </div>
        <div className="header-icons">
          <Settings />
          <Menu />
        </div>
      </div>
      {/* <div className="test-typo">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          similique nesciunt veritatis, saepe omnis, adipisci dignissimos cum
          quae accusantium ipsa possimus quam pariatur officia. Sed quisquam
          consectetur pariatur veniam non.
        </p>
      </div> */}
    </Fragment>
  );
}
