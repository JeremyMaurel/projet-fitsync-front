import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';
import { Link } from 'react-router-dom';

import ICategory from '../../@types/category';

// Gestion du style
import './CategoryList.scss';

interface CategoryListProps {
  categories: ICategory[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Categories</h1>
        <div className="tile--list">
          {categories.map((category) => (
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
