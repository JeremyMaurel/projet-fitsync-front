/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-control-regex */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send } from 'react-feather';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
  LinearProgress,
} from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import actionUserSignin from '../../store/thunks/actionUserSignin';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [conditions, setConditions] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (passwordToAnalyze: string) => {
    let strength = 0;
    if (/[A-Z]/.test(passwordToAnalyze)) {
      strength += 1;
    }
    if (/[0-9]/.test(passwordToAnalyze)) {
      strength += 1;
    }
    if (/[^A-Za-z0-9]/.test(passwordToAnalyze)) {
      strength += 1;
    }
    if (/[a-z]/.test(passwordToAnalyze)) {
      strength += 1;
    }
    if (passwordToAnalyze.length >= 8) {
      strength += 1;
    }
    return (strength / 5) * 100;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case 'pseudo':
        setPseudo(value);
        break;
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value);
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'conditions':
        setConditions(checked);
        break;
      default:
        break;
    }
  };

  const isValidEmail = (mailToValidate: string) => {
    const emailRegex =
      /^(?=.{1,64}@.{1,255}$)(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/i;
    return emailRegex.test(mailToValidate);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!pseudo || !mail || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!isValidEmail(mail)) {
      setError('Mail is not valid');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 100) {
      setError('Password does not meet the required criteria');
      return;
    }

    if (!conditions) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    const newUser = { pseudo, mail, password };

    try {
      const result = await dispatch(actionUserSignin(newUser));
      if (actionUserSignin.fulfilled.match(result)) {
        navigate('/login');
      } else {
        const errorMessage =
          typeof result.payload === 'string'
            ? result.payload
            : 'Signup failed. Please try again.';
        setError(errorMessage);
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Hello dear user !
          </Typography>
          <Typography component="p" sx={{ mb: 2 }}>
            Please create your account to access the app
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Choose your pseudo"
              name="pseudo"
              autoComplete="new-username"
              autoFocus
              value={pseudo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your email"
              name="mail"
              autoComplete="new-email"
              value={mail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Choose your password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
            />
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{ mt: 0.5, mb: 1.5 }}
            />
            <Typography variant="body2" color="textSecondary">
              {passwordStrength < 100
                ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and 8 characters.'
                : 'Password is strong enough'}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm your password"
              type="password"
              id="password--confirm"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={conditions}
                  onChange={(e) => setConditions(e.target.checked)}
                  color="primary"
                  required
                />
              }
              label="I agree to the Terms and Conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<Send />}
            >
              Create my account
            </Button>
            <Link to="/login">
              <Typography variant="body2">
                Already have an account? Login here
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
