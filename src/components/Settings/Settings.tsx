/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { User } from 'react-feather';
import React, { useEffect, useState } from 'react';
import './Settings.scss';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Checkbox,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
// Import of header, footer and menu
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import actionUserUpdate from '../../store/thunks/actionUserUpdate';
import {
  fetchWeight,
  actionWeightUpdate,
} from '../../store/thunks/actionWeightUpdate';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genders = ['male', 'female'];

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
  const [personName, setPersonName] = useState<string[]>([gender]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : (value as string[])
    );
  };

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

    const newGender = personName[0];
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
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1 }}>
              User Infos
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="birthdate"
              label="Birthdate"
              name="birthdate"
              type="date"
              defaultValue={formattedBirthdate}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Gender" />}
                MenuProps={MenuProps}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    <ListItemText primary={gender} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="height"
              label="Height (cm)"
              name="height"
              type="number"
              defaultValue={height}
            />
            <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
              User Weight
            </Typography>
            {weight && (
              <div>
                <Typography>
                  Current Weight: {weight} kg (Date:{' '}
                  {new Date(weightDate).toLocaleDateString()})
                </Typography>
              </div>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="newWeight"
              label="New Weight (kg)"
              name="newWeight"
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="newWeightDate"
              label="New Weight Date"
              name="newWeightDate"
              type="date"
              value={newWeightDate}
              onChange={(e) => setNewWeightDate(e.target.value)}
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
              defaultValue={pseudo}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email"
              name="mail"
              type="email"
              defaultValue={mail}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 13 }}
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
