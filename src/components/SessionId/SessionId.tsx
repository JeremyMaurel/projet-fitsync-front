import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Gestion du style
import './SessionId.scss';
import { Edit } from 'react-feather';

export default function SessionId() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Session</h1>
        <div className="tile tile--session-infos">
          <h2 className="tile--session-infos--title">
            Date <br />
            Activity Name
            <br />
            METS
            <br />
            Comment
          </h2>
          <div className="cta--edit-icon">
            <Edit size={20} />
          </div>
        </div>
        <div className="tile--repeat">
          <h2 className="tile--repeat--title">Do it again?</h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
