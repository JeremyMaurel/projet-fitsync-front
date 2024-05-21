// Import of React component or libraries
import { Link } from 'react-router-dom';
import { Send } from 'react-feather';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Signin() {
  return (
    <>
      <DisconnectedHeader />
      <main className="main">
        <h1 className="main--title">Hello dear user !</h1>
        <p className="main--subtitle">
          Please create your account to access the app <br />
          Already have an account ? &nbsp;
          <Link className="form--link" to="/login">
            Login here
          </Link>
        </p>
        <form className="form">
          <h2 className="form--subtitle">Your Fitsync account</h2>
          <input
            className="form--input"
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="Choose your pseudo"
          />
          <input
            className="form--input"
            required="required"
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
          />
          <input
            className="form--input"
            required="required"
            type="text"
            id="password"
            name="password"
            placeholder="Choose your password"
          />
          <input
            className="form--input"
            required="required"
            type="text"
            id="password--confirm"
            name="password-confirm"
            placeholder="Confirm your password"
          />

          <h2 className="form--subtitle">Your physical characteristics</h2>
          <p className="main--subtitle">
            This information will be used to calculate your activity results
          </p>
          <input
            className="form--input"
            type="number"
            id="age"
            name="age"
            placeholder="Age"
          />
          <select name="gender" className="form--input">
            <option value="">--Please indicate your gender--</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="no-gender">Non-binary</option>
          </select>
          <input
            className="form--input"
            required="required"
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight (pounds/kg)"
          />
          <input
            className="form--input"
            type="number"
            id="height"
            name="height"
            placeholder="Height (inches/cm)"
          />
          <div>
            <input type="checkbox" name="conditions" />
            <label for="conditions">
              &nbsp;&nbsp;&nbsp;I agree to the Terms and Conditions
            </label>
          </div>
          <div>
            <button type="submit" className="form--cta">
              Create my account &nbsp; <Send />
            </button>
          </div>
        </form>
      </main>
      <DisconnectedFooter />
    </>
  );
}
