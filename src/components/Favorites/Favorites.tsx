import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';

// Gestion du style
import './Favorites.scss';

export default function Favorites() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Favorites</h1>
        <div className="tile tile--addfav">
          <h2 className="tile--addfav--title">+</h2>
        </div>
        <div className="tile--list">
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
          <div className="tile--list--item">
            <h2 className="tile--list--title">
              Activity
              <br /> MET
            </h2>
          </div>
        </div>
        <CtaMore />
      </main>
      <Footer />
    </>
  );
}
