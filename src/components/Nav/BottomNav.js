import React, { useState } from 'react';
import './_nav.scss';
// import firebaseApp from '../../firebase/firebase';

import firebaseApp from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/action';

import { ReactComponent as Logo } from '../../assets/images/logo-512x512.svg';
// import { HashLink as Link } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PieChartIcon from '@material-ui/icons/PieChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SmsIcon from '@material-ui/icons/Sms';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    marginBottom: '0px',
    width: '100vw',
    backgroundColor: '#fff',
    zIndex: '999',
    boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.15)',
  },
  nav: {
    '&$selected': {
      color: '#3456ff',
    },
  },
  logo: {
    paddingTop: '0 !important',
  },
  selected: {},
});

function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    firebaseApp.auth().signOut();
  };

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Portfolio"
          value="Portfolio"
          icon={<PieChartIcon />}
          classes={{
            root: classes.nav,
            selected: classes.selected,
          }}
        />
        <BottomNavigationAction
          label="Cash"
          value="Cash"
          icon={<AccountBalanceIcon />}
          classes={{
            root: classes.nav,
            selected: classes.selected,
          }}
        />
        <BottomNavigationAction
          label=""
          value=""
          icon={<Logo />}
          className={classes.logo}
        />
        <BottomNavigationAction
          label="Messages"
          value="Messages"
          icon={<SmsIcon />}
          classes={{
            root: classes.nav,
            selected: classes.selected,
          }}
        />
        <BottomNavigationAction
          label="Account"
          value="Account"
          icon={<AccountCircleIcon />}
          classes={{
            root: classes.nav,
            selected: classes.selected,
          }}
          onClick={() => handleLogOut()}
        />
      </BottomNavigation>
    </div>
  );
}

export default BottomNav;
