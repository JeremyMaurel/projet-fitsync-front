// Import des bibliothèques ou des composants techniques
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

// Import des sous-composants
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Import des composants MUI
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

// Feuille de style
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
                          SESSION DATE: {session.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Duration: {session.duration} mn
                        </Typography>
                        {session.activity_name}
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
