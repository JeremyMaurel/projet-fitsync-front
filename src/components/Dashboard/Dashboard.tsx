/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
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
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
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
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import { actionUserUpdate } from '../../store/thunks/actionUserUpdate';
import getTotalMetPerWeek from '../../utils/getWeeklyMets';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const dispatch = useAppDispatch();
  const weight = useAppSelector((state) => state.weight.value);
  const weightDate = useAppSelector((state) => state.weight.date);
  const targetMet = useAppSelector((state) => state.user.objective) || 0;
  const sessions = useAppSelector((state) => state.sessions.sessionsList);
  const totalMetPerWeek = getTotalMetPerWeek(sessions);
  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [newTargetMet, setNewTargetMet] = useState('');

  const data: any = {
    labels: weightDate || [],
    datasets: [
      {
        label: 'Weight (kg)',
        data: weight || [],
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

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(event.target.value);
  };

  const handleSaveWeight = () => {
    dispatch(
      actionWeightUpdate({ weight: parseFloat(newWeight), date: new Date() })
    );
    setNewWeight('');
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleOpenTargetModal = () => {
    setIsTargetModalOpen(true);
  };

  const handleCloseTargetModal = () => {
    setIsTargetModalOpen(false);
  };

  const handleTargetWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTargetMet(event.target.value);
  };

  const handleSaveTargetWeight = () => {
    dispatch(actionUserUpdate({ objective: parseFloat(newTargetMet) }));
    setNewTargetMet('');
    setIsTargetModalOpen(false);
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
              <Typography variant="h5" color="primary">
                Weekly METs Tracking
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.secondary">
                Track your METs objectives and achievements.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, mb: 2 }}
              >
                Achieved METs: {totalMetPerWeek}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(totalMetPerWeek / targetMet) * 100}
              />
            </CardContent>
          </Card>
          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" color="primary">
                    METs Objectives
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontSize={13}
                  textAlign="justify"
                >
                  METs (Metabolic Equivalent of Task) measure the intensity of
                  physical activities. The World Health Organization (WHO)
                  recommends 600 to 1200 MET-minutes per week for basic health.
                  For optimal health benefits, aim for 3000 to 4000 MET-minutes
                  per week. Set your weekly goal here.
                </Typography>
                <Chip
                  onClick={handleOpenTargetModal}
                  label={
                    targetMet
                      ? `Target METs: ${targetMet} `
                      : 'Set your target METs'
                  }
                  size="small"
                  sx={{
                    color: '#adfa1d',
                    fontSize: '1.00rem',
                    height: '36px',
                    mt: 2,
                  }}
                />
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
              <Typography variant="body1" color="text.secondary">
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
              <Typography variant="body1" color="text.secondary">
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
            Add Current Weight
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

      <Modal
        open={isTargetModalOpen}
        onClose={handleCloseTargetModal}
        aria-labelledby="target-modal-title"
        aria-describedby="target-modal-description"
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
          <Typography
            id="target-modal-title"
            variant="h5"
            component="h2"
            gutterBottom
          >
            Set your METs objectives
          </Typography>
          <TextField
            id="new-target-weight"
            label="Enter Target METs"
            variant="outlined"
            value={newTargetMet}
            onChange={handleTargetWeightChange}
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleSaveTargetWeight}
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
