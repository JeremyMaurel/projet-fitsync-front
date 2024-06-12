/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { actionNewPassword } from '../../store/thunks/actionResetPassword';
import {
  calculatePasswordStrength,
  isPasswordValid,
} from '../../utils/PasswordStrengthLogic';
import PasswordProgression from '../Base/utils/PasswordProgression';

export default function ResetPasswordNew() {
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }
    if (!isPasswordValid(newPassword)) {
      return;
    }

    await dispatch(actionNewPassword(newPassword));
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordMismatch(false);

    navigate('/login');
  };

  const handleNewPassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    setPasswordStrength(calculatePasswordStrength(newPass));
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
            Well done ! One more step and your password will be changed: Give
            here your new password !
          </Typography>

          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="New password"
              type="password"
              name="newPassword"
              id="newPassword"
              variant="outlined"
              margin="normal"
              required
              value={newPassword}
              onChange={handleNewPassword}
            />
            <PasswordProgression passwordStrength={passwordStrength} />
            <TextField
              fullWidth
              label="Confirm your new password"
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              variant="outlined"
              margin="normal"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="button"
              sx={{ mt: 2 }}
              onClick={handlePasswordChange}
            >
              Validate password reset
            </Button>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
