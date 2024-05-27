// Import of React component or libraries
import { Link } from 'react-router-dom';
import { Send } from 'react-feather';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Login() {
  const emailFormState = useAppSelector(
    (state) => state.user.credentials.email
  );
  const passFromState = useAppSelector(
    (state) => state.user.credentials.password
  );
  const dispatch = useAppDispatch();

  // on recupere l'erreur du state si jamais y'en a une on l'affiche
  const loginError = useAppSelector((state) => state.user.error);

  // on recupere dans le state isLogged pour filer en prop à LoginForm et ça conditionne l'affichage du form ou du bouton deco
  const logged = useAppSelector((state) => state.user.logged);

  // on recupère le pseudo dans le state pour afficher le message de bienvenue
  const pseudo = useAppSelector((state) => state.user.pseudo);

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
              <Link className="form--link" to="/signin">
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
