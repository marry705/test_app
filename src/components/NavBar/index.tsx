import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

import './NavBar.css';

const NavBar: React.FC = () => (
  <nav className="nav-wrapper">
    <NavLink to={ROUTES.CURRENCIES}>Bitcoin Data</NavLink>
    <NavLink to={ROUTES.ANALYSIS}>Analysis</NavLink>
  </nav>
);

export default NavBar;
