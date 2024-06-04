// Import of librairies or technical components
import { Typography, Button, Container, Box } from '@mui/material';

import AdminFooter from '../Base/Footer/AdminFooter';
import AdminHeader from '../Base/Header/AdminHeader';

export default function HomeAdmin() {
  return (
    <>
      <AdminHeader />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          mt: 1,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 10 }}>
          Hello Admin!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%',
            maxWidth: 300,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href="/activity-request"
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Activity Request
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="/admin-settings"
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Admin Settings
          </Button>
        </Box>
      </Container>
      <AdminFooter />
    </>
  );
}
