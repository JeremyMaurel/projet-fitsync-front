import Header from '../Base/Header/Header';
import './LandingPage.scss';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main--title">Fitsync lorem ipsum dolor sit amet</h1>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </h3>
        <button className="form--btn lp-cta" type="submit">
          Create account
        </button>
      </main>
    </>
  );
}
