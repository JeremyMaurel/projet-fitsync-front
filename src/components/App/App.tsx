// Import of librairies or technical components
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

// Import of MUI Core Librairy for Darkmode
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import of Redux store thunks
import actionThunkFetchActivities from '../../store/thunks/thunkFetchActivities';
import actionThunkFetchCategories from '../../store/thunks/thunkFetchCategories';
// import actionThunkFetchUser from '../../store/thunks/thunkFetchUser';
import actionCheckLogin from '../../store/thunks/actionCheckLogin';

// Import of sub-components
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import ActivityId from '../ActivityId/ActivityId';
import SessionId from '../SessionId/SessionId';
import Dashboard from '../Dashboard/Dashboard';
import Favorites from '../Favorites/Favorites';
import LandingPage from '../LandingPage/LandingPage';
import SettingsLogedIn from '../Settings/SettingsLogedIn';
import CategoryId from '../Category/CategoryId';
import CategoryList from '../Category/CategoryList';
import History from '../History/History';
import NewSession from '../NewSession/NewSession';
import Login from '../Authentification/Login';
import Signin from '../Authentification/Signin';
import ResetPassword from '../ResetPassword/ResetPassword';

// Stylesheet
import './App.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#adfa1d',
    },
    secondary: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    // h3: {
    //   textShadow: '0px 1px 1px #4d4d4d',
    //   color: '#222',
    // },
  },
});

function App() {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);

  useEffect(() => {
    dispatch(actionThunkFetchCategories());
    dispatch(actionThunkFetchActivities());
    dispatch(actionCheckLogin());
    // dispatch(actionThunkFetchUser());
  }, [dispatch]);

  console.log('Is user connected?', logged);

  return (
    <div className="app">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {logged && <Route path="/home" element={<Home />} />}
          {logged && <Route path="/settings" element={<Settings />} />}
          {logged && (
            <Route path="/settings-LogedIn" element={<SettingsLogedIn />} />
          )}
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/category-list/:categoryId" element={<CategoryId />} />
          <Route path="/activity/:activityId" element={<ActivityId />} />
          {logged && (
            <Route path="/history/:sessionId" element={<SessionId />} />
          )}
          {logged && <Route path="/dashboard" element={<Dashboard />} />}
          {logged && <Route path="/favorites" element={<Favorites />} />}
          {/* <Route path="/favorites" element={<Favorites />} /> */}
          {logged && <Route path="/history" element={<History />} />}
          {logged && <Route path="/new-session" element={<NewSession />} />}
          <Route path="*" element={<div>Page 404 (belle page à créer)</div>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
