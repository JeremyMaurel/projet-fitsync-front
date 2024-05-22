import { useEffect, useState } from 'react';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaAdd from '../Base/CtaAdd/CtaAdd';
import CtaMore from '../Base/CtaMore/CtaMore';

// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

// Import de l'interface de types
import IActivity from '../../@types/activity';

import './CategoryId.scss';

interface CategoryIdProps {
  categoryId: number;
  categoryName: string;
}

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
        {/* afficher le activities.map si la variable activities n'est pas null */}
        {/* il va falloir compléter avec des isLoading pour gérer le render */}
        {activities !== null && (
          <div className="tile--list">
            {activities.map((activity) => (
              <div key={activity.id} className="tile--list--item">
                <h2 className="tile--list--title">
                  {activity.name}
                  <br /> MET: {activity.met}
                </h2>
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
