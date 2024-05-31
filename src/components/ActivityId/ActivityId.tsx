// Import of librairies or technical components
import { Zap, ArrowRightCircle, PlusCircle } from 'react-feather';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Stylesheet
import './ActivityId.scss';
import thunkAddFavorite from '../../store/thunks/thunkAddFavorite';

export default function ActivityId() {
  // -- STATE REDUX --
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // I pickup from the state all the activities
  const activities = useAppSelector((state) => state.activities.activitiesList);

  // I use the Activity id from the page URL
  const { activityId } = useParams();
  const idFromUrl = Number(activityId);

  const activityToDisplay = activities.find(
    (activity) => activity.id === idFromUrl
  );

  const handleAddToFavorites = async () => {
    await dispatch(thunkAddFavorite(Number(activityId)));
    navigate('/favorites');
  };

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
        <button
          className="form--btn"
          type="button"
          onClick={handleAddToFavorites}
        >
          Add to my favorite activities <PlusCircle />
        </button>
      </main>
      <Footer />
    </>
  );
}
