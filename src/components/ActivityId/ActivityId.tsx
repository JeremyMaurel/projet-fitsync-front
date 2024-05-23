// Import of librairies or technical components
import { Zap, ArrowRightCircle, PlusCircle } from 'react-feather';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import instanceAxios from '../../axios/axiosInstance';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Import of custom types
import IActivity from '../../@types/activity';

// Stylesheet
import './ActivityId.scss';

export default function ActivityId() {
  const { activityId } = useParams();

  // -- state for activity management --
  const [activity, setActivity] = useState<IActivity[]>([]);

  // -- fetchActivity --
  const fetchActivity = async () => {
    const response = await instanceAxios.get(`/activities/${activityId}`);
    setActivity(response.data.data);
  };

  // -- useEffect in order to fetch data from API when page loads
  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Activity</h1>
        <div className="tile--activity-name">
          <h2 className="tile--activity-name--title">{activity.name}</h2>
        </div>
        <div className="tile tile--met">
          <h2 className="tile--met--title">
            &nbsp;
            <Zap /> &nbsp;: &nbsp;{activity.met} MET
          </h2>
          <p className="tile--met--title">per minute of exercise</p>
        </div>
        <div className="tile tile--description">
          <h2 className="tile--description--title">Description</h2>
        </div>
        <Link to="/new-session" className="form--btn--link">
          <button className="form--btn" type="submit" value={`${activity.id}`}>
            Select this activity &nbsp; <ArrowRightCircle />
          </button>
        </Link>
        <Link to="/favorites" className="form--btn--link">
          <button className="form--btn" type="submit" value={`${activity.id}`}>
            Add to my favorite activities &nbsp; <PlusCircle />
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
