import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaAdd from '../Base/CtaAdd/CtaAdd';
import CtaMore from '../Base/CtaMore/CtaMore';

// Import de l'interface de types
import IActivity from '../../@types/activity';

import './CategoryId.scss';

interface CategoryIdProps {
  categoryId: number;
  categoryName: string;
  activities: IActivity[];
}

export default function CategoryId({
  categoryName,
  activities,
}: CategoryIdProps) {
  // -- STATE REDUX --
  // Je choppe toutes les catégories et leur contenu (= les activités qui en font partie)
  const categoriesList = useAppSelector(
    (state) => state.categories.categoriesList
  );

  // Je récupère l'ID de la catégorie consultée via son URL
  const { categoryId } = useParams();
  console.log(categoryId);

  // -- STATE REDUX --
  const activitiesList = useAppSelector(
    (state) => state.categories.categoriesList
  );

  const activitiesToDisplay = activitiesList.filter(
    (activity) => activity.category_id === +categoryId
  );
  console.log({ activitiesToDisplay });

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">{categoryName}</h1>
        {/* afficher le activities.map si la variable activities n'est pas null */}
        {/* il va falloir compléter avec des isLoading pour gérer le render */}
        {activities !== null && (
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
        )}
        <CtaMore />
        <CtaAdd />
      </main>
      <Footer />
    </>
  );
}

/* 
Backup de ma V1 non-fonctionnelle

export default function CategoryId({
  categoryName,
  activities,
}: CategoryIdProps) {
  // -- STATE REDUX --
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  const { categoryId } = useParams();
  console.log(categoryId);

  const activitiesToDisplay = activitiesList.find(
    (activity) => activity.category_id === +categoryId
  );
  console.log({ activitiesToDisplay });
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">{categoryName}</h1>
        
        {activities !== null && (
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
        )}
        <CtaMore />
        <CtaAdd />
      </main>
      <Footer />
    </>
  );
}
            
*/

/* 








export default function CategoryId({
  categoryId,
  categoryName,
}: CategoryIdProps) {
 const [activities, setActivities] = useState<IActivity[] | null>(null);

  // -- fetchActivities --
  const fetchActivities = async () => {
    const response = await instanceAxios.get(`categories/${categoryId}`);
    console.log(response.data.data.activities);
    setActivities(response.data.data.activities);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">{categoryName}</h1>
        /* afficher le activities.map si la variable activities n'est pas null */
/* il va falloir compléter avec des isLoading pour gérer le render */
/*
        {activities !== null && (
          <div className="tile--list">
            {activities.map((activity) => (
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
        )}
        <CtaMore />
        <CtaAdd />
      </main>
      <Footer />
    </>
  );
}
*/
