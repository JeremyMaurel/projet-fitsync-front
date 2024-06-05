/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Link,
} from '@mui/material';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

// Définition du thème personnalisé
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#adfa1d',
    },
  },
});

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Dashboard
          </Typography>

          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5" color="primary">
                  Goals Tracking
                </Typography>
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">
                  Track your goals and monitor your progress.
                </Typography>
                <FitnessCenterIcon color="primary" />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5" color="primary">
                  Weight Tracking Data
                </Typography>
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">
                  Monitor your weight over time.
                </Typography>
                <FitnessCenterIcon color="primary" />
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Link
                component={RouterLink}
                to="/favorites"
                color="inherit"
                underline="none"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" color="primary">
                    Favorites
                  </Typography>
                  <FavoriteIcon color="primary" />
                </Box>
              </Link>

              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Access your favorite activities and routines quickly.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Link
                component={RouterLink}
                to="/history"
                color="inherit"
                underline="none"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" color="primary">
                    History
                  </Typography>
                  <HistoryIcon color="primary" />
                </Box>
              </Link>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Review your past activities and progress.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </ThemeProvider>
  );
};

export default Dashboard;
