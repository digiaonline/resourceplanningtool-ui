// @flow

import React from 'react';
import css from './Header.css';
import {NavLink} from 'react-router-dom';

import logo from '../../assets/digia-logo.png';

const Header = () => (
  <div className={css.header}>
    <NavLink className={css.logo} to="/">
      <img className={css.logoImg} src={logo} alt="digia-logo" />
      <div className={css.logoTitle}>Digia Nord P&amp;P</div>
    </NavLink>
    <div className={css.navbar}>
      <NavLink exact to="/" activeClassName={css.active}>
        PROJECTS
      </NavLink>
      <NavLink to="/customers" activeClassName={css.active}>
        CUSTOMERS
      </NavLink>
      <NavLink to="/people" activeClassName={css.active}>
        PEOPLE
      </NavLink>
    </div>
  </div>
);

export default Header;
