import React from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector } from '../../hooks/redux-hooks';

export default function SettingsLogedIn() {
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const avatarUrl = 'public/1.jpg';

  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Box
            sx={{
              display: 'block',
            }}
          >
            <Avatar
              alt="User Photo"
              src={avatarUrl}
              sx={{ width: 70, height: 70, mb: 2 }}
            />
            <Typography component="h1" variant="h4">
              {pseudo}'s Settings
            </Typography>
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
              }}
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
