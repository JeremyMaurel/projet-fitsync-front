/* eslint-disable no-console */
// Import of libraries or technical components
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Import des bibliothèques ou des composants techniques

import {
  Container,
  Box,
  Typography,
  Card,
  CardHeader,
  useTheme,
  Grid,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import thunkDeleteSession from '../../store/thunks/thunkDeleteSession';
import { fetchWeight } from '../../store/thunks/actionWeightUpdate';

// Import des sous-composants
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function History() {
  // -- STATE REDUX --
  const dispatch = useAppDispatch();
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  const sessionsListToSort = sessionsList.slice(0);
  const userWeight = useAppSelector((state) => state.weight.value);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
    dispatch(fetchWeight());
  }, [dispatch]);

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fonction de gestion de la suppression
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [sessionToDeleteId, setSessionToDeleteId] = useState<number | null>(
    null
  );

  const openConfirmDeleteDialog = (sessionId: number) => {
    setSessionToDeleteId(sessionId);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteDialog = () => {
    setSessionToDeleteId(null);
    setConfirmDeleteOpen(false);
  };

  const handleDeleteSessionConfirmed = (sessionId: number) => {
    dispatch(thunkDeleteSession(sessionId));
    closeConfirmDeleteDialog();
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, paddingBottom: 10, color: theme.palette.text.primary }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          History
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Grid container spacing={2}>
            {sessionsListToSort
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((session) => (
                <Grid item xs={12} sm={6} key={session.id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <CardHeader
                      title={
                        <div>
                          <Link
                            to={`/history/${session.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <Typography variant="body2" color="primary">
                              {dayjs(session.date).format('MM.DD.YYYY')}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {dayjs(session.date).format('HH:mm')}
                            </Typography>
                            {session.activity_name}

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ mt: 2 }}
                            >
                              Duration: {session.duration} mn
                            </Typography>
                            <Typography variant="body2" color="primary">
                              Total METs :
                              {(
                                session.activity_met * session.duration
                              ).toFixed(1)}{' '}
                              <br />
                              Total burned calories :
                              {Math.round(
                                (session.activity_met *
                                  session.duration *
                                  (userWeight ?? 70)) /
                                  60
                              )}
                            </Typography>
                          </Link>
                          <hr
                            style={{
                              width: '100%',
                              border: `none`,
                              borderTop: `1px solid ${theme.palette.divider}`,
                              margin: `16px 0 8px`,
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 1 }}
                          >
                            {' '}
                            Comment: {session.comment}
                          </Typography>
                        </div>
                      }
                    />
                    <Box mt={2} mb={2} ml={2} mr={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => openConfirmDeleteDialog(session.id)}
                        sx={{
                          color: theme.palette.text.disabled,
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
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
            onClick={() => handleDeleteSessionConfirmed(sessionToDeleteId ?? 0)}
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
