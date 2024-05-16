// Import d'icônes de React-Feather
import { PlusCircle } from 'react-feather';

// Import des headers, footers et menu une fois prêts

// Gestion du style
import './Home.scss';

export default function Home() {
  return (
    <main className="Home">
      <h1 className="page-title">Hello user!</h1>
      <div className="tile tile--goals">
        <div className="tile--goal">
          <h2 className="tile--goal--title">Weekly Goal</h2>
          <img
            src="src/assets/weekly-goal-fake-progress-bar.png"
            alt="fake-progress-weekly"
            className="tile--goal--img"
          />
        </div>
        <div className="tile--goal">
          <h2 className="tile--goal--title">Monthly Goal</h2>
          <img
            src="src/assets/monthly-goal-fake-progress-bar.png"
            alt="fake-progress-monthly"
            className="tile--goal--img"
          />
        </div>
      </div>
      <div className="tile tile--favorites">
        <div className="tile--header">
          <h2 className="tile--header--title">My favorite activities</h2>
          <PlusCircle size={30} className="tile--header--button" />
        </div>
        <ul>
          <li>Favorite activity 1</li>
          <li>Favorite activity 2</li>
          <li>Favorite activity 3</li>
          <li>Favorite activity 4</li>
        </ul>
      </div>
    </main>
  );
}
