// Importation des librairies et des composants techniques
import { PlusCircle } from 'react-feather';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';

// Importation des sous-composants
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Importation des composants MUI
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Button,
  Link as MuiLink,
} from '@mui/material';

// Feuille de style
import './Home.scss';

export default function Home() {
  // -- ÉTAT REDUX --
  // Récupération du pseudo depuis l'état pour dire bonjour
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Hello {pseudo}!
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardHeader title="Weekly Goal" />
            <CardContent>
              <img
                src="src/assets/weekly-goal-fake-progress-bar.png"
                alt="fake-progress-weekly"
                className="tile--goal--img"
              />
            </CardContent>
          </Card>
          <Card sx={{ width: '100%' }}>
            <CardHeader title="Monthly Goal" />
            <CardContent>
              <img
                src="src/assets/monthly-goal-fake-progress-bar.png"
                alt="fake-progress-monthly"
                className="tile--goal--img"
              />
            </CardContent>
          </Card>
        </Box>
        <MuiLink
          component={Link}
          to="/favorites"
          underline="none"
          sx={{ width: '100%' }}
        >
          <Card sx={{ mb: 4, width: '100%' }}>
            <CardHeader title="My Favorite Activities" />
            <CardContent>
              <List>
                {favoritesList.map((favorite) => (
                  <ListItem key={favorite.activity_id}>
                    {favorite.activity_name}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </MuiLink>
        <Card sx={{ width: '100%' }}>
          <CardHeader title="My Last Sessions" />
          <CardContent>
            <List>
              <ListItem>Placeholder session 1</ListItem>
              <ListItem>Placeholder session 2</ListItem>
              <ListItem>Placeholder session 3</ListItem>
              <ListItem>Placeholder session 4</ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
