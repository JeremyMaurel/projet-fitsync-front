/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
  Modal,
  TextField,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';
import {
  fetchGraphicWeight,
  actionWeightUpdate,
} from '../../store/thunks/actionWeightUpdate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const dispatch = useAppDispatch();
  const weight = useAppSelector((state) => state.weight.value);
  const weightDate = useAppSelector((state) => state.weight.date);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');

  const data = {
    labels: weightDate,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weight,
        borderColor: '#adfa1d',
        backgroundColor: 'rgba(173, 250, 29, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  };

  const handleSaveWeight = () => {
    dispatch(
      actionWeightUpdate({ weight: parseFloat(newWeight), date: new Date() })
    );
    setNewWeight('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchGraphicWeight());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Box display="flex" flexDirection="column">
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
            marginBottom: 10,
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
                <IconButton color="primary" onClick={handleOpenModal}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height={300}
              >
                <Line data={data} options={options} />
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
      </Box>
      {isDesktop ? <DesktopFooter /> : <Footer />}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
            Add New Weight
          </Typography>
          <TextField
            id="new-weight"
            label="Enter Weight (kg)"
            variant="outlined"
            value={newWeight}
            onChange={handleWeightChange}
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleSaveWeight}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Dashboard;
