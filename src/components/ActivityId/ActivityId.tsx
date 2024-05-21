import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Gestion du style
import './ActivityId.scss';
import { PlusCircle } from 'react-feather';

export default function ActivityId() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Activity</h1>
        <div className="tile--activity-name">
          <h2 className="tile--activity-name--title">Activity Name</h2>
        </div>
        <div className="tile tile--met">
          <h2 className="tile--met--title">MET</h2>
        </div>
        <div className="tile tile--description">
          <h2 className="tile--description--title">Description</h2>
        </div>
        <button className="form--btn" type="submit">
          Select
        </button>
      </main>
      <Footer />
    </>
  );
}
