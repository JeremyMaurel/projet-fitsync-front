/* eslint-disable jsx-a11y/label-has-associated-control */
import { User } from 'react-feather';

import './Settings.scss';

// Import of header, footer and menu
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { actionUpdateUser } from '../../store/reducers/userReducer';

export default function Settings() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const email = useAppSelector((state) => state.user.email);
  const gender = useAppSelector((state) => state.user.gender);
  const birthdate = useAppSelector((state) => state.user.birthdate);
  const weight = useAppSelector((state) => state.user.weight);
  const height = useAppSelector((state) => state.user.height);

  const formattedBirthdate = birthdate
    ? new Date(birthdate).toISOString().split('T')[0]
    : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      birthdate: formData.get('birthdate'),
      gender: formData.get('gender'),
      weight: parseFloat(formData.get('weight')),
      height: parseFloat(formData.get('height')),
      pseudo: formData.get('pseudo'),
      email: formData.get('email'),
    };
    dispatch(actionUpdateUser(updatedUser));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put('/api/user', formData);
  //     console.log('User data updated:', response.data);
  //   } catch (error) {
  //     console.error('Error updating user data:', error);
  //   }
  // };

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form--header">
              <h1 className="form--header--title">User Settings</h1>
              <User className="form--header--logo" />
            </div>
            <h2 className="form--subtitle">User Infos</h2>
            <label className="form--label">Date of Birth</label>
            <input
              className="form--input"
              type="date"
              id="birthdate"
              name="birthdate"
              placeholder="Date of Birth"
              defaultValue={formattedBirthdate}
            />
            <label className="form--label">Gender</label>
            <div className="form--input-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  defaultChecked={gender === 'Male'}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  defaultChecked={gender === 'Female'}
                />
                Female
              </label>
            </div>
            <label className="form--label">Weight (kg)</label>
            <input
              className="form--input"
              type="number"
              id="weight"
              name="weight"
              placeholder="Weight (kg)"
              defaultValue={weight}
            />
            <label className="form--label">Height (cm)</label>
            <input
              className="form--input"
              type="number"
              id="height"
              name="height"
              placeholder="Height (cm)"
              defaultValue={height}
            />
            <h2 className="form--subtitle">User Account</h2>
            <label className="form--label">Pseudo</label>
            <input
              className="form--input"
              type="text"
              id="pseudo"
              name="pseudo"
              placeholder="Pseudo"
              defaultValue={pseudo}
            />
            <label className="form--label">Email</label>
            <input
              className="form--input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={email}
            />
            <button className="form--btn" type="submit">
              Validation
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
