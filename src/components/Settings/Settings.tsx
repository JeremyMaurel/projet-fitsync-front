import { User } from 'react-feather';

import './Settings.scss';

export default function Settings() {
  return (
    <div className="container">
      <form className="form">
        <div className="form--header">
          <h1 className="form--header--title">User Settings</h1>
          <User className="form--header--logo" />
        </div>
        <h2 className="form--subtitle">User Infos</h2>
        <input
          className="form--input"
          type="number"
          id="age"
          name="age"
          placeholder="Age"
        />
        <input
          className="form--input"
          type="text"
          id="gender"
          name="gender"
          placeholder="Gender"
        />
        <input
          className="form--input"
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
        <h2 className="form--subtitle">User Account</h2>
        <input
          className="form--input"
          type="text"
          id="pseudo"
          name="pseudo"
          placeholder="Pseudo"
        />
        <input
          className="form--input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="form--input"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button className="form--btn" type="submit">
          Validation
        </button>
      </form>
    </div>
  );
}
