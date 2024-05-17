import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Gestion du style
import './CategoryList.scss';

export default function CategoryList() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Categories</h1>
        <div className="category-list">
          <div className="tile-category">
            <h2 className="tile-title">Category 1</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 2</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 3</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 4</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 5</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 6</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 7</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 8</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 9</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 10</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 11</h2>
          </div>
          <div className="tile-category">
            <h2 className="tile-title">Category 12</h2>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
