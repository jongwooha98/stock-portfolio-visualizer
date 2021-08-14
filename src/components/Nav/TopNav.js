import React from 'react';
import './_nav.scss';
import Logo from '../../assets/images/toss-logo.svg';

function TopNav() {
  return (
    <div className="topnav__wrapper">
      <div className="topnav__logo">
        <img src={Logo} width={100} alt="" />
      </div>

      <div className="topnav__menuItems">
        <a href="/">Free Stocks</a>
        <a href="/">PortFolio</a>
        <a href="/">Cash</a>
        <a href="/">Messages</a>
        <a href="/">Account</a>
      </div>
    </div>
  );
}

export default TopNav;
