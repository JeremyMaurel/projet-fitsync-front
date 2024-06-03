/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { User } from 'react-feather';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

// Import of header, footer and menu
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import actionUserUpdate from '../../store/thunks/actionUserUpdate';
import {
  fetchWeight,
  actionWeightUpdate,
} from '../../store/thunks/actionWeightUpdate';

export default function Settings() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const mail = useAppSelector((state) => state.user.mail);
  const gender = useAppSelector((state) => state.user.gender);
  const birthdate = useAppSelector((state) => state.user.birthdate);
  const weight = useAppSelector((state) => state.weight.value);
  const weightDate = useAppSelector((state) => state.weight.date);
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
        actionWeightUpdate({ weight: updatedWeight, date: weightDate })
      );
    }

    if (Object.keys(updatedUser).length > 0) {
      await dispatch(actionUserUpdate(updatedUser));
    }
  };

  useEffect(() => {
    dispatch(fetchWeight());
  }, [dispatch]);

  useEffect(() => {}, [weight, weightDate]);
  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="h1" variant="h5">
              User Settings
            </Typography>
            <User style={{ marginLeft: '8px' }} />
          </Box>
          <Box component="form" sx={{ mt: 1 }}>
            <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1 }}>
              User Infos
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              autoComplete="age"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="weight"
              label="Weight (pounds/kg)"
              name="weight"
              type="number"
              autoComplete="weight"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="height"
              label="Height (inches/cm)"
              name="height"
              type="number"
              autoComplete="height"
            />
            <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
              User Account
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Pseudo"
              name="pseudo"
              autoComplete="pseudo"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Validation
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
