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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionUserSignin from '../../store/thunks/actionUserSignin';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Signin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const mail = useAppSelector((state) => state.user.mail);
  const password = useAppSelector((state) => state.user.credentials.password);
  const error = useAppSelector((state) => state.user.error);

  let confirmPassword;
  let conditions;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = e.target;
    const newUser = {};

    const newMail = formData.mail.value;
    if (newMail !== mail) {
      newUser.mail = newMail;
    }
    const newPseudo = formData.pseudo.value;
    newUser.pseudo = newPseudo;

    const newPassword = formData.password.value;
    const confirmPassword = formData.confirmPassword.value;
    if (newPassword === confirmPassword) {
      newUser.password = newPassword;
    }

    // Basic validation
    if (!pseudo || !mail || !password || !confirmPassword || !conditions) {
      let error = 'All fields are required';
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!conditions) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    dispatch(actionUserSignin(newUser)).then((result) => {
      if (actionUserSignin.fulfilled.match(result)) {
        navigate('/login');
      }
    });
  };

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Hello dear user!
          </Typography>
          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Please create your account to access the app <br />
            Already have an account? &nbsp;
            <Link to="/login">Login here</Link>
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {/* {success && <Alert severity="success">{success}</Alert>} */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Choose your pseudo"
              name="pseudo"
              autoComplete="pseudo"
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
              autoComplete="email"
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
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm your password"
              type="password"
              id="password--confirm"
              value={confirmPassword}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox checked={conditions} color="primary" required />
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
              onSubmit={handleSubmit}
            >
              Create my account
            </Button>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}

/* 

import { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';

// Import of components
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

// Stylesheet
import './Authentification.scss';

export default function Signin() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [conditions, setConditions] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!pseudo || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!conditions) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    setSuccess('Account created successfully!');
  };

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Hello dear user!
          </Typography>
          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Please create your account to access the app <br />
            Already have an account? &nbsp;
            <Link to="/login">Login here</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Choose your pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Choose your password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="Confirm your password"
              type="password"
              id="password--confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
*/
