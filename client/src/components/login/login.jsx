/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import './login.css';

export default function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const navigate = useNavigate('/');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    userService().login(loginState);
    navigate('/');
    window.location.reload();
  };

  const handleLogout = () => {
    userService().logout();
    navigate('/');
    window.location.reload();
  };

  const handleChange = (evt, control) => {
    setLoginState({ ...loginState, [control]: evt.target.value });
  };

  if (localStorage.getItem('user')) {
    return (
      <form>
        <button className="form-group__logout" type="reset" onClick={handleLogout}>
          Logout
        </button>
      </form>
    );
  }
  return (
    <div className="form-login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="user-name"
            id="user-name"
            value={loginState.email}
            required
            onChange={(ev) => handleChange(ev, 'email')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="user-password"
            id="user-password"
            value={loginState.password}
            required
            onChange={(ev) => handleChange(ev, 'password')}
          />
        </div>
        <button className="form-group__login" type="submit">Login</button>
      </form>
    </div>
  );
}
