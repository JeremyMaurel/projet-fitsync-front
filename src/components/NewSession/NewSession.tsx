import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Container,
  OutlinedInput,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import thunkAddNewSession from '../../store/thunks/thunkAddNewSession';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

const NewSession = () => {
  const dispatch = useAppDispatch();

  // -- NEW SESSION STATES --
  const [newSessionComment, setNewSessionComment] = useState('');
  const [newSessionDuration, setNewSessionDuration] = useState('');
  const [newSessionActivityName, setNewSessionActivityName] = useState('');
  const [newSessionActivityId, setNewSessionActivityId] = useState('');
  const [newSessionDateTime, setNewSessionDateTime] = useState('');

  // -- LIST SESSIONS SELECTOR --
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  // -- LIST ACTIVITIES SELECTOR --
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  const [searchActivities, setSearchActivities] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const currentDateTime = dayjs();

  const handleSearch = (event) => {
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

  const handleNewSessionDuration = (event) => {
    setNewSessionDuration(event.target.value);
  };

  const handleNewSessionComment = (event) => {
    setNewSessionComment(event.target.value);
  };

  const handleSelectActivity = (activityId: number, activityName: string) => {
    setNewSessionActivityId(activityId); // Définit l'ID de l'activité sélectionnée
    setSearchActivities(activityName); // Met à jour le terme de recherche avec le nom de l'activité
    setFilteredActivities([]); // Réinitialise la liste des activités filtrées
  };

  // SUBMIT NEW SESSION
  const handleSubmitAddSession = () => {
    // Créer un objet représentant la nouvelle session avec le commentaire
    const newSession = {
      duration: newSessionDuration,
      activityId: newSessionActivityId,
      date: newSessionDateTime,
      comment: newSessionComment,
    };

    console.log(newSessionDateTime);

    // Envoyer la nouvelle session à la base de données en utilisant le thunkAddNewSession
    dispatch(thunkAddNewSession(newSession));

    // Réinitialiser le champ de commentaire après l'ajout de la session
    setNewSessionDuration('');
    setNewSessionComment('');
    setNewSessionActivityId('');
  };

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
          <Typography variant="h3" component="h1" gutterBottom>
            New Session
          </Typography>

          <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                My Last Sessions
              </Typography>
              <List>
                {sessionsList.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Typography variant="body1" color="primary">
                          {session.activity_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {session.date}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < sessionsList.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          <Box display="flex" flexDirection="column" mb={2}>
            <TextField
              label="Search Activities"
              variant="outlined"
              value={searchActivities}
              onChange={(event) => {
                handleSearch(event);
                setNewSessionActivityName(event.target.value);
              }}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="primary" />
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

          <Typography variant="h6" gutterBottom>
            Date & Time
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue={currentDateTime}
              sx={{ width: '100%', mb: 5 }}
              slotProps={{ textField: { fullWidth: true } }}
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
              placeholder="Enter duration in minutes"
              value={newSessionDuration}
              onChange={handleNewSessionDuration}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
            />
          </Box>

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
              marginTop: 5,
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
      <Footer />
    </>
  );
};

export default NewSession;
