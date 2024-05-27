// Import of React component or libraries
import { Link } from 'react-router-dom';
import { Send } from 'react-feather';
import { useState } from 'react';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Signin() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [conditions, setConditions] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!pseudo || !email || !password || !confirmPassword) {
      setError('All fields are required');
      console.log(error);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!conditions) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    setSuccess('Account created successfully!');
  };

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
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form--subtitle">Your Fitsync account</h2>
          <input
            required
            className="form--input"
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="Choose your pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <input
            className="form--input"
            required
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form--input"
            required
            type="text"
            id="password"
            name="password"
            placeholder="Choose your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form--input"
            required
            type="text"
            id="password--confirm"
            name="password-confirm"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div>
            <input
              type="checkbox"
              name="conditions"
              required
              checked={conditions}
              onChange={(e) => setConditions(e.target.checked)}
            />
            <label htmlFor="conditions">
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
