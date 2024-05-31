// Import of React component or libraries
import { Link } from 'react-router-dom';

// Stylesheet
import './Header.scss';

export default function DisconnectedHeader() {
  return (
    <header className="header">
      <div className="header--logo">
        <Link className="menu-item" to="/">
          <img src="/fitsync-logo.svg" alt="Logo Fitsync" />
        </Link>
      </div>
      <div className="header--login">
        <Link to="/login">Login / Register</Link>
      </div>
    </header>
  );
}
