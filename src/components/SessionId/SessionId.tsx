/* eslint-disable @typescript-eslint/no-shadow */
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

export default function SessionId() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const idFromUrl = Number(sessionId);
  const sessions = useAppSelector((state) => state.sessions.sessionsList);
  const session = sessions.find((session) => session.id === idFromUrl);
  // Looking for the activity ID to add to the custom link in CTA, not provided in session object
  const activities = useAppSelector((state) => state.activities.activitiesList);
  const activity = activities.find(
    (activity) => activity.name === session?.activity_name
  );

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const doItAgain = () => {
    navigate(`/new-session/${activity?.id}`);
  };
  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);
  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Session
        </Typography>
        <Card sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(session?.date).format('MM-DD-YYYY HH:mm')}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  {session?.activity_name}
                </Typography>
                <Typography variant="body1" color="primary">
                  MET {session?.activity_met}
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Divider />
            <Box mt={2} mb={2} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={doItAgain}
            >
              Do it again?
            </Button>
          </CardContent>
        </Card>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
