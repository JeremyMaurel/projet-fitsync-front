/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { SetStateAction, useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function ResetPassword() {
  const [mail, setMail] = useState('');

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMail(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('Email address well submit', mail);
  };

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="sm" sx={{ mt: 15 }}>
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: '80%', textAlign: 'center' }}
          >
            Oops, it happens! No worries, we'll help you get back on track. Just
            enter your email address below, and we'll send you a link to reset
            your password.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="mail"
              id="email"
              variant="outlined"
              margin="normal"
              value={mail}
              onChange={handleEmailChange}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
