// Import of React component or libraries
import { Link } from 'react-router-dom';
import { Send } from 'react-feather';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Login() {
  return (
    <>
      <DisconnectedHeader />
      <main className="main">
        <h1 className="main--title">Hello dear user !</h1>
        <p className="main--subtitle">Please login to access the app</p>
        <form className="form">
          <input
            type="email"
            required="required"
            className="form--input"
            name="email"
            placeholder="Your email"
          />
          <input
            type="password"
            required="required"
            className="form--input"
            name="password"
            placeholder="Your password"
          />
          <p>
            I forgot my password, &nbsp;
            <Link className="form--link" to="/reset-password">
              Let&lsquo;s reset it
            </Link>
          </p>
          <div>
            <button type="submit" className="form--cta">
              Connect &nbsp; <Send />
            </button>

            <p>
              You don&lsquo;t have an account yet ? &nbsp;
              <Link className="form--link" to="/signup">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </main>
      <DisconnectedFooter />
    </>
  );
}
