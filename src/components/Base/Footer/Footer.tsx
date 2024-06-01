import * as React from 'react';

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
  const [value, setValue] = React.useState(0);

  return (
    <FixedBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        to="/home"
        selected={value === 0}
      />
      <BottomNavigationAction
        label="Dashboard"
        icon={<Dashboard />}
        component={Link}
        to="/dashboard"
        selected={value === 1}
      />
      <BottomNavigationAction
        icon={<Add />}
        component={Link}
        to="/new-session"
        selected={value === 2}
      />
    </FixedBottomNavigation>
  );
}
