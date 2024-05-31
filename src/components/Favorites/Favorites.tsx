import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';

// Gestion du style
import './Favorites.scss';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Favorites</h1>
        <Link to="/category-list" className="form--btn--link">
          <button className="form--btn">Add New Activity</button>
        </Link>
        <div className="tile--list">
          {favoritesList.map((favorite) => (
            <div key={favorite.activity_id} className="tile--list--item">
              <h2 className="tile--list--title">
                {favorite.activity_name}
                <br /> {favorite.activity_met}
              </h2>
            </div>
          ))}
        </div>
        <CtaMore />
      </main>
      <Footer />
    </>
  );
}
