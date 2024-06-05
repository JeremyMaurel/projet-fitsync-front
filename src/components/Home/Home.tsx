/* eslint-disable react/function-component-definition */
// Import of librairies or technical components
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Link as MuiLink,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

const Home: React.FC = () => {
  // Pickup from the state of pseudo to say hello
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const avatarUrl = 'public/1.jpg';
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  // Fonction pour générer un pourcentage aléatoire pour simuler la progression
  const getRandomPercentage = () => Math.floor(Math.random() * 100) + 1;

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container component="main" maxWidth="md" sx={{ mt: 10, pb: 10 }}>
        <Box
          sx={{
            display: 'block',
            justifyContent: 'center',
          }}
        >
          <Avatar
            alt="User Photo"
            src={avatarUrl}
            sx={{ width: 70, height: 70, mb: 2 }}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            Hello {pseudo}!
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Card sx={{ width: '100%', mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="Weekly Goal" />
            <CardContent>
              <Typography variant="h3" color="primary">
                {getRandomPercentage()}%
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="Monthly Goal" />
            <CardContent>
              <Typography variant="h3" color="primary">
                {getRandomPercentage()}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <MuiLink
          component={RouterLink}
          to="/favorites"
          underline="none"
          sx={{ width: '100%' }}
        >
          <Card sx={{ mb: 4, width: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="My Favorite Activities" />
            <CardContent>
              <List>
                {favoritesList.map((favorite, index) => (
                  <React.Fragment key={favorite.activity_id}>
                    <ListItem>{favorite.activity_name}</ListItem>
                    {index !== favoritesList.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </MuiLink>
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <CardHeader title="My Last Sessions" />
          <CardContent>
            <List>
              <ListItem sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* Placeholder pour les sessions */}
                Placeholder session 1
              </ListItem>
              <ListItem sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* Placeholder pour les sessions */}
                Placeholder session 2
              </ListItem>
              <ListItem sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* Placeholder pour les sessions */}
                Placeholder session 3
              </ListItem>
              <ListItem sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* Placeholder pour les sessions */}
                Placeholder session 4
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
};

export default Home;
