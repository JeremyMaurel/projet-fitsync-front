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
  MenuItem,
  Container,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import thunkAddSession from '../../store/thunks/thunkAddSession';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

const NewSession = () => {
  const dispatch = useAppDispatch();

  // -- NEW SESSION STATES --
  const [comment, setComment] = useState('');
  const [duration, setDuration] = useState('');
  const [activityId, setActivityId] = useState('');
  const [date, setDate] = useState('');

  // -- STATE LIST SESSIONS --
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  console.log(sessionsList);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  // -- STATE LIST ACTIVITIES --
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [durationHours, setDurationHours] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const handleSelectActivity = (activityName) => {
    setSearchTerm(activityName);
    setFilteredActivities([]);
  };

  const handleDurationChange = (event) => {
    const { name, value } = event.target;
    if (name === 'hours') {
      setDurationHours(value);
    } else if (name === 'minutes') {
      setDurationMinutes(value);
    }
  };

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');

  const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i);

  // List of mock sessions
  const mockSessions = [
    { id: 1, name: 'Yoga', date: '2024-05-28' },
    { id: 2, name: 'Running', date: '2024-05-27' },
    { id: 3, name: 'Cycling', date: '2024-05-26' },
  ];

  // SUBMIT NEW SESSION
  const handleSubmit = () => {
    dispatch(
      thunkAddSession({
        duration,
        activityId,
        date,
        comment,
      })
    );
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
              value={searchTerm}
              onChange={handleSearch}
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
                  maxHeight: '200px', // Set the maximum height of the scrollable area
                  overflowY: 'auto', // Enable vertical scrolling
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <List>
                  {filteredActivities.map((activity) => (
                    <ListItem
                      key={activity.id}
                      onClick={() => handleSelectActivity(activity.name)}
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
            <Box display="flex" flexDirection="column" mb={2}>
              <DatePicker
                label="Date Picker"
                defaultValue={yesterday}
                disablePast
                views={['year', 'month', 'day']}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
              <TimePicker
                label="Time Picker"
                defaultValue={todayStartOfTheDay}
                disablePast
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
            </Box>
          </LocalizationProvider>

          <Typography variant="h6" gutterBottom>
            Duration
          </Typography>
          <Box display="flex" mb={2}>
            <TextField
              select
              label="Hours"
              name="hours"
              value={durationHours}
              onChange={handleDurationChange}
              sx={{ mr: 2 }}
              fullWidth
            >
              {hoursOptions.map((hour) => (
                <MenuItem key={hour} value={hour}>
                  {hour}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Minutes"
              name="minutes"
              value={durationMinutes}
              onChange={handleDurationChange}
              fullWidth
            >
              {minutesOptions.map((minute) => (
                <MenuItem key={minute} value={minute}>
                  {minute}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a comment..."
            variant="outlined"
            margin="normal"
            value={comment}
            onChange={handleChangeComment}
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
            onClick={handleSubmit}
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
