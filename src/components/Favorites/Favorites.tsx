import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';
import thunkAddFavorite from '../../store/thunks/thunkAddFavorite';

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

  const handleAddFavorite = () => {
    const newFavorite = {
      activity_name: 'New Activity', // You should get these details from user input
      activity_met: '5.0', // You should get these details from user input
      activity_id: Date.now(), // Temporary ID, will be replaced by backend
    };
    dispatch(thunkAddFavorite(newFavorite));
  };

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Favorites</h1>
        <button className="tile tile--addfav" onClick={handleAddFavorite}>
          <h2 className="tile--addfav--title">+</h2>
        </button>
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
