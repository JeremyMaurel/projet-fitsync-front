import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchUser from '../../store/thunks/thunkFetchUser';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import './Home.scss';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const loggedStatusHome = useAppSelector((state) => state.user.logged);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login'); // Redirige si le token n'est pas présent
    } else {
      dispatch(actionThunkFetchUser());
    }
  }, [navigate, dispatch]);

  console.log('loggedStatusHome: ', loggedStatusHome);

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Hello {pseudo}!</h1>
        <div className="tile tile--goals">
          <div className="tile--goal">
            <h2 className="tile--goal--title">Weekly Goal</h2>
            <img
              src="src/assets/weekly-goal-fake-progress-bar.png"
              alt="fake-progress-weekly"
              className="tile--goal--img"
            />
          </div>
          <div className="tile--goal">
            <h2 className="tile--goal--title">Monthly Goal</h2>
            <img
              src="src/assets/monthly-goal-fake-progress-bar.png"
              alt="fake-progress-monthly"
              className="tile--goal--img"
            />
          </div>
        </div>
        <div className="tile tile--favorites">
          <div className="tile--header">
            <h2 className="tile--header--title">My favorite activities</h2>
            <PlusCircle size={30} className="tile--header--button" />
          </div>
          <ul>
            <li>Favorite activity 1</li>
            <li>Favorite activity 2</li>
            <li>Favorite activity 3</li>
            <li>Favorite activity 4</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
