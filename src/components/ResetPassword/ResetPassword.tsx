import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Gestion du style
import './ResetPassword.scss';

export default function ResetPassword() {
  return (
    <>
      <DisconnectedHeader />
      <main className="main">
        <h1 className="main--title">Reset password</h1>
        <p className="main--text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur qui
          quos ut modi accusantium ab. Itaque voluptas harum officia molestias
          consequatur possimus atque quas aliquid.
        </p>
        <form className="form">
          <input
            className="form--input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />

          <button className="form--btn" type="submit">
            Reset password
          </button>
        </form>
      </main>
      <DisconnectedFooter />
    </>
  );
}
