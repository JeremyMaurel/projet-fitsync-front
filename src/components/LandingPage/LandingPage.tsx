// Import of librairies or technical components
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function LandingPage() {
  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography
          variant="h2"
          color="primary"
          lineHeight="1"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Track your fitness & weight progress
        </Typography>
        <Typography variant="h5" paragraph>
          Monitor your workouts and weight changes to stay motivated and achieve
          your wellness goals.
        </Typography>
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 10 }}
          >
            Create account
          </Button>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
