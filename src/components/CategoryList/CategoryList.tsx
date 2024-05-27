// Import of librairies or technical components
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';

// Stylesheet
import './CategoryList.scss';

export default function CategoryList() {
  // -- STATE REDUX --
  const categoriesList = useAppSelector(
    (state) => state.categories.categoriesList
  );

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Categories</h1>
        <div className="tile--list">
          {categoriesList.map((category) => (
            <div key={category.id} className="tile--list--item">
              <Link
                className="tile--list--link"
                to={`/category-list/${category.id}`}
              >
                <h2 className="tile--list--title">{category.name}</h2>
              </Link>
            </div>
          ))}
        </div>
        <CtaMore />
      </main>
      <Footer />
    </>
  );
}
