/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import cart from '../../assets/cart.svg';
import beer from '../../assets/beer.svg';
import user from '../../assets/user.svg';
import home from '../../assets/home.svg';

export default function Menu() {
  if (localStorage.getItem('user')) {
    const auth = JSON.parse(localStorage.getItem('user'));
    const cartUrl = `/cart/${auth?.user?.cart}`;

    return (
      <nav className="nav-menu">
        <ul className="nav-menu__ul">
          <Link to="/"><li className="nav-menu__li"><img className="nav-menu__icon" src={home} alt="home" /></li></Link>
          <Link to="/beers"><li className="nav-menu__li"><img className="nav-menu__icon" src={beer} alt="beer" /></li></Link>
          <Link to={cartUrl}><li className="nav-menu__li"><img className="nav-menu__icon" src={cart} alt="cart" /></li></Link>
          <Link to="/login"><li className="nav-menu__li"><img className="nav-menu__icon" src={user} alt="user" /></li></Link>
        </ul>
      </nav>
    );
  }
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__ul">
        <Link to="/"><li className="nav-menu__li"><img className="nav-menu__icon" src={home} alt="home" /></li></Link>
        <Link to="/beers"><li className="nav-menu__li"><img className="nav-menu__icon" src={beer} alt="beer" /></li></Link>
        <Link to="/login"><li className="nav-menu__li"><img className="nav-menu__icon" src={user} alt="user" /></li></Link>
      </ul>
    </nav>
  );
}
