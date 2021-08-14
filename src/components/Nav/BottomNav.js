import React, { useState } from 'react';
import './_nav.scss';
import { ReactComponent as Logo } from '../../assets/images/toss-logo.svg';
import { HashLink as Link } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsIcon from '@material-ui/icons/Sms';
import ShowChartIcon from '@material-ui/icons/ShowChart';
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    marginBottom: '0px',
    width: '100vw',
    backgroundColor: '#fff',
    zIndex: '1000',
    boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.15)',
  },
  successIcon: {
    color: 'green',
    selected: 'blue',
  },
  errorIcon: {
    color: 'red',
  },
});

function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
          icon={<ShowChartIcon className={classes.successIcon} />}
        />
        <BottomNavigationAction
          label="Watchlist"
          value="Watchlist"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction label="" value="" icon={<Logo />} />
        <BottomNavigationAction
          label="Messages"
          value="Messages"
          icon={<SmsIcon />}
        />
        <BottomNavigationAction
          label="Account"
          value="Account"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default BottomNav;

// function Nav() {
//   return (
//     <nav className="nav container">
//       <Link to="/#" className="nav__logo">
//         <div className="header__logo">
//           <img src={tossLogo} alt="" width={90} />
//         </div>
//       </Link>
//       <div className="nav__menu">
//         <ul className="nav__list grid">
//           <li className="nav__item">
//             <Link to="/#portfolio" className="nav__link active-link">
//               <i className="uil uil-estate nav__icon" /> Portfolio
//             </Link>
//           </li>
//           <li className="nav__item">
//             <Link to="/#news" className="nav__link">
//               <i className="uil uil-list-ol-alt nav__icon" /> News
//             </Link>
//           </li>
//           <li className="nav__item">
//             <Link to="/#watchlist" className="nav__link">
//               <i className="uil uil-list-ol-alt nav__icon" /> Watchlist
//             </Link>
//           </li>
//           <li className="nav__item">
//             <Link to="/#account" className="nav__link">
//               <i className="uil uil-list-ol-alt nav__icon" /> Account
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {/* search bar */}
//       {/* <div className="header__search">
//         <div className="header__search-container">
//           <input placeholder="search" type="text" />
//         </div>
//       </div> */}

//       <div className="nav__btns">
//         <div className="nav__toggle" id="nav-toggle">
//           <i className="uil uil-apps" />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
