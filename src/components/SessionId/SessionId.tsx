import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

export default function SessionId() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Session
        </Typography>
        <Card sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" component="div">
                Date
                <br />
                Activity Name
                <br />
                METS
                <br />
                Comment
              </Typography>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Do it again?
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
