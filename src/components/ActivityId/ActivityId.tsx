/* eslint-disable react/function-component-definition */
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import { Add as AddIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import thunkAddFavorite from '../../store/thunks/thunkAddFavorite';

// Définition du thème personnalisé
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#adfa1d',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const ActivityId: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activityId } = useParams();
  const idFromUrl = Number(activityId);
  const activities = useAppSelector((state) => state.activities.activitiesList);
  const activityToDisplay = activities.find(
    (activity) => activity.id === idFromUrl
  );

  const handleAddToFavorites = async () => {
    await dispatch(thunkAddFavorite(Number(activityId)));
    navigate('/favorites');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Activity
          </Typography>
          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">{activityToDisplay?.name}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="textSecondary">
                Description of the activity goes here.
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            color="secondary"
            className="form--btn"
            fullWidth
            sx={{ mb: 2 }}
            endIcon={<FavoriteIcon />}
            onClick={handleAddToFavorites}
          >
            Add to my favorite activities
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="form--btn"
            fullWidth
            endIcon={<AddIcon />}
            value={`${activityToDisplay?.id}`}
          >
            Select this activity
          </Button>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default ActivityId;
