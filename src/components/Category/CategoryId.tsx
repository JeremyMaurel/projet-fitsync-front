// Import of librairies or technical components
import { useMediaQuery, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaAdd from '../Base/CtaAdd/CtaAdd';
import DesktopHeader from '../Base/Header/DesktopHeader';

// Stylesheet
import './CategoryId.scss';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function CategoryId() {
  // -- STATE REDUX --
  // I pickup from the state all the categories
  const categories = useAppSelector((state) => state.categories.categoriesList);
  // I pickup from the state all the activities
  const activities = useAppSelector((state) => state.activities.activitiesList);

  // I use the Category id from the page URL
  const { categoryId } = useParams();
  const idFromUrl = Number(categoryId);

  // I select the category from the state matching the Category id from the URL
  const categoryToDisplay = categories.find(
    (category) => category.id === idFromUrl
  );
  // I select all the activities from the state matching the Category id from the URL
  const activitiesToDisplay = activities.filter(
    (activity) => activity.category_id === idFromUrl
  );

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main className="main">
        <h1 className="main--title">{categoryToDisplay?.name}</h1>
        <div className="tile--list">
          {activitiesToDisplay.map((activity) => (
            <div key={activity.id} className="tile--list--item">
              <Link
                className="tile--list--link"
                to={`/activity/${activity.id}`}
              >
                <h2 className="tile--list--title">
                  {activity.name}
                  <br /> MET: {activity.met}
                </h2>
              </Link>
            </div>
          ))}
        </div>
        <CtaAdd />
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
