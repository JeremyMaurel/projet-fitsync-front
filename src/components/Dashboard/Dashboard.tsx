import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Gestion du style
import './Dashboard.scss';
import { Plus } from 'react-feather';

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Dashboard</h1>
        <div className="tile tile--goals">
          <h2 className="tile--goals--title">Goals Tracking</h2>
          <div className="cta--plus-icon">
            <Plus size={30} />
          </div>
        </div>
        <div className="tile tile--weight">
          <h2 className="tile--weight--title">Weight tracking data</h2>
          <div className="cta--plus-icon">
            <Plus size={30} />
          </div>
        </div>
        <div className="tile tile--favorites">
          <h2 className="tile--favorites--title">Favorites</h2>
        </div>
        <div className="tile tile--history">
          <h2 className="tile--history--title">History</h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
