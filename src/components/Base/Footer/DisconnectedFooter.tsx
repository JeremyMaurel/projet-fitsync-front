import { Link } from 'react-router-dom';

import './Footer.scss';

export default function DisconnectedFooter() {
  return (
    <footer className="footer">
      <p className="footer--credit">© Fitsync 2024</p>
      <Link className="footer--contact" to="/contact">
        Contact support
      </Link>
    </footer>
  );
}
