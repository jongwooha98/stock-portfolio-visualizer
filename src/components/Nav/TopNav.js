import React from 'react';
import './_nav.scss';
import firebaseApp from '../../firebase/firebase';
import Logo from '../../assets/images/toss-logo.svg';

function TopNav() {
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
        <button
          className="nav__link"
          onClick={() => firebaseApp.auth().signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default TopNav;
