// Import of librairies or technical components
import { Zap, ArrowRightCircle, PlusCircle } from 'react-feather';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Stylesheet
import './ActivityId.scss';

export default function ActivityId() {
  // -- STATE REDUX --
  // I pickup from the state all the activities
  const activities = useAppSelector((state) => state.activities.activitiesList);

  // I use the Activity id from the page URL
  const { activityId } = useParams();
  const idFromUrl = Number(activityId);

  const activityToDisplay = activities.find(
    (activity) => activity.id === idFromUrl
  );

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Activity</h1>
        <div className="tile--activity-name">
          <h2 className="tile--activity-name--title">
            {activityToDisplay?.name}
          </h2>
        </div>
        <div className="tile tile--met">
          <h2 className="tile--met--title">
            &nbsp;
            <Zap /> &nbsp;: &nbsp;{activityToDisplay?.met} MET
          </h2>
          <p className="tile--met--title">per minute of exercise</p>
        </div>
        <div className="tile tile--description">
          <h2 className="tile--description--title">Description</h2>
        </div>
        <Link to="/new-session" className="form--btn--link">
          <button
            className="form--btn"
            type="submit"
            value={`${activityToDisplay?.id}`}
          >
            Select this activity &nbsp; <ArrowRightCircle />
          </button>
        </Link>
        <Link to="/favorites" className="form--btn--link">
          <button
            className="form--btn"
            type="submit"
            value={`${activityToDisplay?.id}`}
          >
            Add to my favorite activities &nbsp; <PlusCircle />
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

/* 
Backup de la v1 fonctionnelle sans Redux avec State local

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
*/
