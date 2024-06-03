/* eslint-disable @typescript-eslint/no-shadow */
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

export default function SessionId() {
  const dispatch = useAppDispatch();
  const { sessionId } = useParams();
  const idFromUrl = Number(sessionId);
  const sessions = useAppSelector((state) => state.sessions.sessionsList);
  const session = sessions.find((session) => session.id === idFromUrl);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" gutterBottom>
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
              <Typography variant="h5" component="div">
                Date: {session?.date}
                <br />
                Activity Name: {session?.activity_name}
                <br />
                METS: {session?.activity_met}
                <br />
                Comment: {session?.comment}
              </Typography>
              <IconButton color="primary" />
            </Box>
            <Divider />
            <Box mt={2} mb={2} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Do it again?
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
