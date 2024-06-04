// Import of libraries or technical components
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  useTheme,
  Grid,
} from '@mui/material';
import {
  Spa,
  DirectionsRun,
  PedalBike,
  Pool,
  FitnessCenter,
  Terrain,
} from '@mui/icons-material';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';

// Stylesheet
import './CategoryList.scss';

// Mapping of activity names to icons
const activityIcons = {
  Yoga: Spa,
  Running: DirectionsRun,
  Cycling: PedalBike,
  Swimming: Pool,
  Weightlifting: FitnessCenter,
  Hiking: Terrain,
};

export default function CategoryList() {
  // -- STATE REDUX --
  const categoriesList = useAppSelector(
    (state) => state.categories.categoriesList
  );

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, pb: 5, color: theme.palette.text.primary }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Categories
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Grid container spacing={2}>
            {categoriesList.map((category) => {
              const IconComponent = activityIcons[category.name] || Spa;
              return (
                <Grid item xs={12} sm={6} key={category.id}>
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
                        <Link
                          to={`/category-list/${category.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {category.name}
                        </Link>
                      }
                      action={
                        <IconButton>
                          <IconComponent color="primary" />
                        </IconButton>
                      }
                      sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Additional content can go here */}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
