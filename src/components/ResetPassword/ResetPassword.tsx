/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';
import { actionResetPassword } from '../../store/thunks/actionResetPassword';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export default function ResetPassword() {
  const [mail, setMail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);

  const handleEmailChange = (event: any) => {
    setMail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(actionResetPassword({ mail })).then(() => {});
    setEmailSent(true);
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
          {emailSent ? (
            <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
              An email of reinitialisation has been sent to {mail}. Please check
              your mailbox.
            </Typography>
          ) : (
            <>
              <Typography
                variant="body1"
                paragraph
                sx={{ maxWidth: '80%', textAlign: 'center' }}
              >
                Oops, it happens! No worries, we'll help you get back on track.
                Just enter your email address below, and we'll send you a link
                to reset your password.
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
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
            </>
          )}
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
