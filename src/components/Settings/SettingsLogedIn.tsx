import { User, Edit } from 'react-feather';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

import './Settings.scss';

export default function SettingsLogedIn() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <form className="form">
            <div className="form--header">
              <h1 className="form--header--title">User Settings</h1>
              <User className="form--header--logo" />
            </div>
            <h2 className="form--subtitle">User Infos</h2>
            <ul className="form--list">
              <li className="list--item">
                Age <Edit className="list--item--edit" />
              </li>
              <li className="list--item">
                Gender <Edit className="list--item--edit" />
              </li>
              <li className="list--item">
                Weight (pounds/kg) <Edit className="list--item--edit" />
              </li>
              <li className="list--item">
                Height (inches/cm) <Edit className="list--item--edit" />
              </li>
            </ul>
            <h2 className="form--subtitle">User Account</h2>
            <ul className="form--list">
              <li className="list--item">
                Pseudo <Edit className="list--item--edit" />
              </li>
              <li className="list--item">
                Email <Edit className="list--item--edit" />
              </li>
              <li className="list--item">
                Password <Edit className="list--item--edit" />
              </li>
            </ul>
            <button className="form--btn" type="submit">
              Validation
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
