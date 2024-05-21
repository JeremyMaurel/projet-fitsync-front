import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';

import ICategories from '../../@types/categories';

// Gestion du style
import './CategoryList.scss';

interface CategoryListProps {
  categories: ICategories[];
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
              <h2 className="tile--list--title">{category.name}</h2>
            </div>
          ))}
        </div>
        <CtaMore />
      </main>
      <Footer />
    </>
  );
}
