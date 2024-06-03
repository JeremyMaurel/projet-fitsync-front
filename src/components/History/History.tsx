// Import of libraries or technical components
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Import of MUI components
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid,
} from '@mui/material';

// Stylesheet
import './History.scss';

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

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, color: theme.palette.text.primary }}
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
            {sessionsList.map((session) => {
              return (
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
                          {session.activity_name}{' '}
                        </Link>
                      }
                      sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Affichage des informations supplémentaires de la session */}
                      <Typography variant="body2" color="textSecondary">
                        Duration: {session.duration} minutes
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {session.date}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Comment: {session.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
