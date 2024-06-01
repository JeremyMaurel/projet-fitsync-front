import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';

import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import CtaMore from '../Base/CtaMore/CtaMore';

// Gestion du style
import './Favorites.scss';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Favorites
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/category-list"
            >
              Add New Activity
            </Button>
          </Box>
          <Grid container spacing={3}>
            {favoritesList.map((favorite) => (
              <Grid item xs={12} sm={6} md={4} key={favorite.activity_id}>
                <Card>
                  <CardContent>
                    <Link
                      component={RouterLink}
                      to={`/activity/${favorite.activity_id}`}
                      underline="none"
                      color="inherit"
                    >
                      <Typography variant="h6">
                        {favorite.activity_name}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        MET: {favorite.activity_met}
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}></Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
