import React from 'react';
import './_nav.scss';
import Logo from '../../assets/images/toss-logo.svg';

import firebaseApp from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/action';

function TopNav() {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    firebaseApp.auth().signOut();
  };

  return (
    <div className="topnav__wrapper">
      <div className="topnav__logo">
        <img src={Logo} width={100} alt="" />
      </div>

      <div className="topnav__menuItems">
        <a className="nav__link" href="/">
          PortFolio
        </a>
        <a className="nav__link" href="/">
          Cash
        </a>
        <a className="nav__link" href="/">
          Messages
        </a>
        <button className="nav__link" onClick={() => handleLogOut()}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default TopNav;
