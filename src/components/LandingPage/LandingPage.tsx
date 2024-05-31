// Import of React component or libraries
import { Link } from 'react-router-dom';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './LandingPage.scss';

export default function LandingPage() {
  return (
    <>
      <DisconnectedHeader />
      <main className="main">
        <h1 className="main--title">Fitsync lorem ipsum dolor sit amet</h1>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </h3>
        <Link to="/signin" className="lp-cta--link">
          <button className="form--btn lp-cta" type="submit">
            Create account
          </button>
        </Link>
      </main>
      <DisconnectedFooter />
    </>
  );
}
