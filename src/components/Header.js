import React from 'react';
import '../sass/_header.scss';
import tossLogo from '../assets/images/toss-logo.svg';

function Header() {
  return (
    <div className="header__wrapper">
      {/* logo */}
      <div className="header__logo">
        <img src={tossLogo} alt="" width={90} />
      </div>
      {/* search bar */}
      <div className="header__search">
        <div className="header__search-container">
          <input placeholder="search" type="text" />
        </div>
      </div>
      {/* menu items */}
      <div className="header__menu-items">
        <a href="#">Free Stocks</a>
        <a href="#">Portfolio</a>
        <a href="#">Cash</a>
        <a href="#">Message</a>
        <a href="#">Account</a>
      </div>
    </div>
  );
}

export default Header;
