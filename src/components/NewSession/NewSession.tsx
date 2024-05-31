import { Search, PlusCircle } from 'react-feather';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Gestion du style
import './NewSession.scss';
import { useAppSelector } from '../../hooks/redux-hooks';

export default function NewSession() {
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  return (
    <>
      <Header />
      <main className="main">
        <div className="session">
          <h1 className="session--title">Session</h1>
          <h2 className="session--last">My last sessions</h2>
          <div className="session--searchBar-container">
            <ul className="session--activity-list">
              {activitiesList.map((activity) => (
                <li key={activity.id} className="session--activity-item">
                  {activity.name}
                </li>
              ))}
            </ul>
            <Search className="session--searchIcon" />
          </div>
          <h3 className="session--info">Date</h3>
          <h3 className="session--info">Duration</h3>
          <div className="session--comments-container">
            <textarea
              className="session--comments"
              name="comments"
              id="comments"
              cols="30"
              rows="10"
              placeholder="Comments"
            />
            <PlusCircle className="session--commentsBtn" />
          </div>
          <a className="session--btn" href="#">
            Add session
            <PlusCircle className="session--plusbtn" />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
