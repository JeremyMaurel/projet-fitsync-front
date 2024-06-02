/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { User } from 'react-feather';
import React, { useEffect, useState } from 'react';
import './Settings.scss';

// Import of header, footer and menu
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import {
  fetchWeight,
  actionUserUpdate,
  actionUserUpdateWeight,
} from '../../store/thunks/actionUserUpdate';

export default function Settings() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const mail = useAppSelector((state) => state.user.mail);
  const gender = useAppSelector((state) => state.user.gender);
  const birthdate = useAppSelector((state) => state.user.birthdate);
  const weight = useAppSelector((state) => state.user.weight);
  const height = useAppSelector((state) => state.user.height);

  const formattedBirthdate = birthdate
    ? new Date(birthdate).toISOString().split('T')[0]
    : '';

  const [newWeight, setNewWeight] = useState('');
  const [newWeightDate, setNewWeightDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = e.target;
    const updatedUser = {};
    const updatedWeight = parseFloat(newWeight);
    const weightDate = newWeightDate;

    const newPseudo = formData.pseudo.value;
    if (newPseudo !== pseudo) {
      updatedUser.pseudo = newPseudo;
    }

    const newEmail = formData.mail.value;
    if (newEmail !== mail) {
      updatedUser.mail = newEmail;
    }

    const newHeight = parseFloat(formData.height.value);
    if (!isNaN(newHeight) && newHeight !== height) {
      updatedUser.height = newHeight;
    }

    const newGender = formData.gender.value;
    if (newGender !== gender) {
      updatedUser.gender = newGender;
    }

    const newBirthdate = formData.birthdate.value;
    if (newBirthdate !== formattedBirthdate) {
      updatedUser.birthdate = newBirthdate;
    }

    if (!isNaN(updatedWeight)) {
      await dispatch(
        actionUserUpdateWeight({ weight: updatedWeight, date: weightDate })
      );
    }

    if (Object.keys(updatedUser).length > 0) {
      await dispatch(actionUserUpdate(updatedUser));
    }
  };

  useEffect(() => {
    dispatch(fetchWeight());
  }, [dispatch]);

  useEffect(() => {
    console.log('Weight data in component:', weight);
  }, [weight]);
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
                  value="male"
                  defaultChecked={gender === 'male'}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  defaultChecked={gender === 'female'}
                />
                Female
              </label>
            </div>

            <label className="form--label">Height (cm)</label>
            <input
              className="form--input"
              type="number"
              id="height"
              name="height"
              placeholder="Height (cm)"
              defaultValue={height}
            />
            <h2 className="form--subtitle">User Weight</h2>
            {weight && weight.length > 0 && (
              <div>
                <label>
                  Current Weight: {weight[0].value} kg (Date:{' '}
                  {new Date(weight[0].date).toLocaleDateString()})
                </label>
              </div>
            )}
            <label className="form--label">New Weight (kg)</label>
            <input
              className="form--input"
              type="number"
              id="newWeight"
              name="newWeight"
              placeholder="New Weight (kg)"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <label className="form--label">New Weight Date</label>
            <input
              className="form--input"
              type="date"
              id="newWeightDate"
              name="newWeightDate"
              placeholder="New Weight Date"
              value={newWeightDate}
              onChange={(e) => setNewWeightDate(e.target.value)}
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
              name="mail"
              placeholder="Email"
              defaultValue={mail}
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
