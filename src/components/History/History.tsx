import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

export default function History() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" gutterBottom>
          History
        </Typography>
        <Grid container spacing={2}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography variant="h6" color="primary">
                        Activity
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Date</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">METS</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
