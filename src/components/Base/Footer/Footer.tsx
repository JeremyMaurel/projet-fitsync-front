// Import of React libraries
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';

// Stylesheet
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="footer--btn" to="/home">
        Home
      </Link>
      <Link className="footer--btn" to="/dashboard">
        Dashboard
      </Link>
      <Link className="footer--btn" to="/new-session">
        <Plus className="footer--btn--plus" />
      </Link>
    </footer>
  );
}
