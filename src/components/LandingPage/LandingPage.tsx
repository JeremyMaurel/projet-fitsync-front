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
        <Typography variant="h3" color="primary" gutterBottom>
          Fitsync lorem ipsum dolor sit amet
        </Typography>
        <Typography variant="h5" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </Typography>
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 20 }}
          >
            Create account
          </Button>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
