/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import of librairies or technical components
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Container,
  OutlinedInput,
  useMediaQuery,
  useTheme,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchWeight } from '../../store/thunks/actionWeightUpdate';

import IActivity from '../../@types/activity';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import thunkAddNewSession from '../../store/thunks/thunkAddNewSession';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import actionThunkFetchActivities from '../../store/thunks/thunkFetchActivities';
import DesktopFooter from '../Base/Footer/DesktopFooter';
import thunkDeleteSession from '../../store/thunks/thunkDeleteSession';

function NewSession() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // -- NEW SESSION STATES --
  const [newSessionComment, setNewSessionComment] = useState('');
  const [newSessionDuration, setNewSessionDuration] = useState<number | null>(
    null
  );
  const [newSessionActivityId, setNewSessionActivityId] = useState<
    number | null
  >(null);
  const [newSessionDateTime, setNewSessionDateTime] = useState('');
  const [totalMet, setTotalMet] = useState(0);
  const [error, setError] = useState('');
  const userWeight = useAppSelector((state) => state.weight.value);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
    dispatch(actionThunkFetchActivities());
    dispatch(fetchWeight());
  }, [dispatch]);

  // -- LIST SESSIONS SELECTOR --
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  const sessionListToSort = sessionsList.slice(0);
  // -- LIST ACTIVITIES SELECTOR --
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  // -- MANAGEMENT OF PRESELECTED ACTIVITY
  // if "/new" is at the en of  URL, there will be no pre selected activity
  // if something else than "/new" ("/1" for example) is at the end of the URL, there will be a pre selected activity with a corresponding activity ID that will be provided to the page
  const { activityIdFromUrl } = useParams();
  const idFromUrl = Number(activityIdFromUrl);

  let preSelectedActivity = false;
  if (activityIdFromUrl !== 'new') {
    preSelectedActivity = true;
  }

  const activityToDisplay: any = activitiesList.find(
    (activity) => activity.id === idFromUrl
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // -- LOCAL UTILS STATES --
  const [activityName, setActivityName] = useState<string>('');
  const [searchActivities, setSearchActivities] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<IActivity[]>([]);
  const currentDateTime = dayjs();

  const handleSearch = (event: any) => {
    setSearchActivities(event.target.value);
    if (event.target.value === '') {
      setFilteredActivities([]);
    } else {
      setFilteredActivities(
        activitiesList.filter((activity) =>
          activity.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };
  const handleNewSessionDuration = (event: any) => {
    const duration = Number(event.target.value);
    setNewSessionDuration(duration);

    // Calculer le MET total dépensé
    const selectedActivity = activitiesList.find(
      (activity) => activity.id === newSessionActivityId || activityToDisplay
    );
    if (selectedActivity) {
      const metValue = selectedActivity.met; // Assurez-vous que le champ MET est disponible dans l'objet activité
      const totalMetValue = metValue * duration;
      setTotalMet(totalMetValue);
    }
  };

  const handleNewSessionComment = (event: any) => {
    setNewSessionComment(event.target.value);
  };

  const handleSelectActivity = (
    activityId: number,
    selectedActivityName: string
  ) => {
    // Mettre à jour l'ID de l'activité sélectionnée
    setNewSessionActivityId(activityId);

    // Mettre à jour le champ de recherche avec le nom de l'activité sélectionnée
    setSearchActivities(selectedActivityName);

    // Réinitialiser la liste des activités filtrées
    setFilteredActivities([]);
  };

  const handlePreSelectedActivity = (idSelectedFromUrl: number) => {
    setNewSessionActivityId(idSelectedFromUrl);
  };

  // SUBMIT NEW SESSION
  const handleSubmitAddSession = () => {
    setError('');
    // Créer un objet représentant la nouvelle session avec le commentaire
    const newSession = {
      duration: newSessionDuration,
      activityId: newSessionActivityId || activityToDisplay.id,
      date: newSessionDateTime,
      comment: newSessionComment,
    };
    if (!newSession.duration || !newSession.activityId || !newSession.date) {
      setError('Activity, date and duration must be provided');
      return;
    }

    const selectedDateTime = dayjs(newSession.date);
    const maxAllowedDateTime = dayjs().add(7, 'day');
    if (selectedDateTime.isAfter(maxAllowedDateTime)) {
      setError('Please select a date within the coming week.');
      return;
    }

    // Envoyer la nouvelle session à la base de données en utilisant le thunkAddNewSession
    dispatch(thunkAddNewSession(newSession));

    // Réinitialiser le champ de commentaire après l'ajout de la session
    setNewSessionDuration(null);
    setNewSessionComment('');
    setNewSessionActivityId(null);
    setSearchActivities('');
    // window.location.reload();
    navigate('/home');
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [sessionToDeleteId, setSessionToDeleteId] = useState<number | null>(
    null
  );
  const openConfirmDeleteDialog = (sessionId: number) => {
    setSessionToDeleteId(sessionId);
    setConfirmDeleteOpen(true);
  };
  const handleDeleteSession = (sessionId: number) => {
    openConfirmDeleteDialog(sessionId);
  };

  const closeConfirmDeleteDialog = () => {
    setSessionToDeleteId(null);
    setConfirmDeleteOpen(false);
  };

  const handleDeleteSessionConfirmed = (sessionId: number) => {
    dispatch(thunkDeleteSession(sessionId));
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            New Session
          </Typography>
          <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" color="action.disabled" gutterBottom>
                My Last Sessions
              </Typography>
              <List>
                {sessionListToSort
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 3)
                  .map((session, index) => (
                    <Box key={session.id}>
                      <ListItem
                        sx={{
                          pt: index === 0 ? 0 : 2,
                          alignItems: 'flex-start',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="body2" color="textSecondary">
                            {dayjs(session.date).format('MM-DD-YYYY HH:mm')}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            {session.activity_name}
                          </Typography>
                          <Typography variant="body1" color="primary">
                            Total METs Expended:{' '}
                            {(session.activity_met * session.duration).toFixed(
                              1
                            )}
                          </Typography>
                          <Typography variant="body1" color="primary">
                            Total burned calories:{' '}
                            {Math.round(
                              (session.activity_met *
                                session.duration *
                                (userWeight ?? 70)) /
                                60
                            )}
                          </Typography>
                        </Box>
                        <Chip
                          label="DELETE"
                          size="small"
                          aria-label="delete"
                          onClick={() => handleDeleteSession(session.id)}
                          sx={{ fontSize: '0.60rem', height: '24px' }}
                        />
                      </ListItem>
                      {index < sessionsList.slice(-3).length - 1 && <Divider />}
                    </Box>
                  ))}
              </List>
            </CardContent>
          </Card>
          {error && <Alert severity="error">{error}</Alert>}
          {!preSelectedActivity && (
            <Box display="flex" flexDirection="column" mb={2}>
              <TextField
                label="Search Activities"
                variant="outlined"
                value={searchActivities}
                onChange={(event) => {
                  handleSearch(event);
                  setActivityName(event.target.value);
                }}
                sx={{ mb: 2, mt: 3 }}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {filteredActivities.length > 0 && (
                <Box
                  sx={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <List>
                    {filteredActivities.map((activity) => (
                      <ListItem
                        key={activity.id}
                        onClick={() =>
                          handleSelectActivity(activity.id, activity.name)
                        }
                      >
                        {activity.name}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}

          {preSelectedActivity && (
            <>
              <Typography variant="h6" gutterBottom>
                Selected Activity
              </Typography>
              <TextField
                label="Activity"
                variant="outlined"
                value={activityToDisplay.name}
                fullWidth
                sx={{ mb: 2, mt: 3 }}
                disabled
              />
            </>
          )}

          <Typography variant="h6" gutterBottom>
            Date & Time
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{ width: '100%', mb: 5 }}
              label="Date and time"
              slotProps={{ textField: { fullWidth: true, required: true } }}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setNewSessionDateTime(newValue.toISOString());
                }
              }}
            />
          </LocalizationProvider>

          <Typography variant="h6" gutterBottom>
            Duration
          </Typography>

          <Box display="flex" mb={2}>
            <OutlinedInput
              fullWidth
              type="number"
              placeholder="Enter duration"
              value={newSessionDuration}
              onChange={handleNewSessionDuration}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
              required
            />
          </Box>

          {totalMet > 0 && (
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Total MET expended: {totalMet.toFixed(2)} <br />
              Total burned calories :{' '}
              {Math.round((totalMet * (userWeight ?? 70)) / 60)}
            </Typography>
          )}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a comment..."
            variant="outlined"
            margin="normal"
            value={newSessionComment}
            onChange={handleNewSessionComment}
          />
          <Button
            variant="contained"
            fullWidth
            endIcon={<AddIcon />}
            sx={{
              marginTop: 3,
              marginBottom: 10,
              bgcolor: '#adfa1d',
              '&:hover': {
                bgcolor: '#8bcc0f',
              },
            }}
            onClick={handleSubmitAddSession}
          >
            Add Session
          </Button>
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
      <Dialog
        open={confirmDeleteOpen}
        onClose={closeConfirmDeleteDialog}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteSessionConfirmed(sessionToDeleteId ?? 0);
              closeConfirmDeleteDialog();
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewSession;
