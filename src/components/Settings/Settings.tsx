import React from 'react';
import { User } from 'react-feather';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

// Import of header, footer and menu
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

export default function Settings() {
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
