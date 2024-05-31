import React, { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { actionChangeCredential } from '../../store/reducers/userReducer';
import actionLogin from '../../store/thunks/actionLogin';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';
import './Authentification.scss';

export default function Login() {
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo ?? '');
  const password = useAppSelector(
    (state) => state.user.credentials.password ?? ''
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginError = useAppSelector((state) => state.user.error);
  const logged = useAppSelector((state) => state.user.logged);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      actionChangeCredential({ name: name as 'pseudo' | 'password', value })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(actionLogin()).then((result) => {
      if (actionLogin.fulfilled.match(result)) {
        navigate('/home');
      }
    });
  };

  useEffect(() => {
    if (logged) {
      navigate('/home');
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
            placeholder="Your pseudo"
            onChange={handleInputChange}
          />
          <input
            type="password"
            required
            className="form--input"
            name="password"
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
