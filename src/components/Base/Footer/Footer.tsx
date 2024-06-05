import { useState } from 'react';
import { Home, Dashboard, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const FixedBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Footer() {
  const [value, setValue] = useState(0);

  return (
    <FixedBottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        label="Dashboard"
        icon={<Dashboard />}
        component={Link}
        to="/dashboard"
      />
      <BottomNavigationAction
        label="Add"
        icon={<Add />}
        component={Link}
        to="/new-session"
      />
    </FixedBottomNavigation>
  );
}
