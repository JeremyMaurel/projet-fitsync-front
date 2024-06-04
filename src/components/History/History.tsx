/* eslint-disable no-console */
// Import of libraries or technical components
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// Import des bibliothèques ou des composants techniques

import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid,
  Button,
  useMediaQuery,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import thunkDeleteSession from '../../store/thunks/thunkDeleteSession';

// Import des sous-composants
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';

// Feuille de style
import './History.scss';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function History() {
  // -- STATE REDUX --
  const dispatch = useAppDispatch();
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  console.log(sessionsList);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fonction de gestion de la suppression
  const handleDeleteSession = (sessionId: number) => {
    dispatch(thunkDeleteSession(sessionId));
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, paddingBottom: 10, color: theme.palette.text.primary }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          History
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Grid container spacing={2}>
            {sessionsList.map((session) => (
              <Grid item xs={12} sm={6} key={session.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title={
                      <Link
                        to={`/history/${session.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Typography variant="body2" color="primary">
                          DATE: {dayjs(session.date).format('MM.DD.YYYY')}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          TIME: {dayjs(session.date).format('HH:mm')}
                        </Typography>
                        {session.activity_name}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 2 }}
                        >
                          Duration: {session.duration} mn
                        </Typography>
                      </Link>
                    }
                    sx={{
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Comment: {session.comment}
                    </Typography>
                  </CardContent>
                  <Box mt={2} mb={2} ml={2} mr={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleDeleteSession(session.id)}
                      sx={{
                        color: theme.palette.text.disabled,
                        backgroundColor: theme.palette.action.hover,
                      }}
                    >
                      DELETE
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
