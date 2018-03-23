// @flow

import React, {Component} from 'react';
import css from './Header.css';
import {NavLink} from 'react-router-dom';
import menuIcon from '../../assets/icon_menu.svg';

import logo from '../../assets/digia-logo.png';

class Header extends Component {
  state = {
    showMenu: false,
  };

  handleOnClickIcon = () => {
    this.setState({showMenu: !this.state.showMenu});
  };

  handleOnClick = () => {
    this.setState({showMenu: false});
  };

  render() {
    const {showMenu} = this.state;
    return (
      <div className={css.header}>
        <NavLink className={css.logo} to="/">
          <img className={css.logoImg} src={logo} alt="digia-logo" />
          <div className={css.logoTitle}>Digia Nord P&amp;P</div>
        </NavLink>
        <div className={showMenu ? css.navbar : css.navbar__hidden}>
          <NavLink
            onClick={this.handleOnClick}
            exact
            to="/projects"
            activeClassName={css.active}
          >
            PROJECTS
          </NavLink>
          <NavLink
            onClick={this.handleOnClick}
            to="/customers"
            activeClassName={css.active}
          >
            CUSTOMERS
          </NavLink>
          <NavLink
            onClick={this.handleOnClick}
            to="/people"
            activeClassName={css.active}
          >
            PEOPLE
          </NavLink>
        </div>
        <img
          onClick={this.handleOnClickIcon}
          className={css.menu__icon}
          src={menuIcon}
          alt="menu"
        />
      </div>
    );
  }
}
export default Header;
