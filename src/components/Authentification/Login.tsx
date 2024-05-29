// Import of React component or libraries
import React, { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send } from 'react-feather';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { actionChangeCredential } from '../../store/reducers/userReducer';
import actionCheckLogin from '../../store/thunks/actionCheckLogin';
// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Login() {
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo ?? '');
  const password = useAppSelector(
    (state) => state.user.credentials.password ?? ''
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // on recupere l'erreur du state si jamais y'en a une on l'affiche
  const loginError = useAppSelector((state) => state.user.error);

  // on recupere dans le state isLogged pour filer en prop à LoginForm et ça conditionne l'affichage du form ou du bouton deco
  const logged = useAppSelector((state) => state.user.logged);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      actionChangeCredential({ name: name as 'pseudo' | 'password', value })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Dispatch login thunk or action
    dispatch(actionCheckLogin()).then(() => {
      // Redirect to /home AFTER a successfull login
      navigate('/home');
    });
  };

  useEffect(() => {
    if (logged) {
      navigate('/home'); // Redirect to the home page or any other page when logged in
      console.log('pseudo:', pseudo);
    }
  }, [logged, navigate, pseudo]);

  return (
    <>
      <DisconnectedHeader />
      <main className="main">
        <h1 className="main--title">Hello dear user !</h1>
        <p className="main--subtitle">Please login to access the app</p>
        {loginError && <p className="error">{loginError}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form--input"
            name="pseudo"
            value={pseudo}
            placeholder="Your pseudo"
            onChange={handleInputChange}
          />
          <input
            type="password"
            required
            className="form--input"
            name="password"
            value={password}
            placeholder="Your password"
            onChange={handleInputChange}
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
