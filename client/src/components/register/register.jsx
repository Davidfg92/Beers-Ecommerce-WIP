/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { userRegister } from '../../services/userService';
import './register.css';

export default function Register() {
  const [registerState, setRegisterState] = useState({ name: '', password: '', email: '' });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    userRegister(registerState);
  };

  const handleChange = (evt, control) => {
    setRegisterState({ ...registerState, [control]: evt.target.value });
  };

  return (
    <div className="form-register">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-group__label" htmlFor="user-name">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            name="user-name"
            id="user-name"
            value={registerState.name}
            required
            onChange={(ev) => handleChange(ev, 'name')}
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="user-password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="user-password"
            id="user-password"
            value={registerState.password}
            required
            onChange={(ev) => handleChange(ev, 'password')}
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="user-email">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="user-email"
            id="user-email"
            value={registerState.email}
            required
            onChange={(ev) => handleChange(ev, 'email')}
          />
        </div>
        <button className="form-group__button" type="submit">Registrar</button>
      </form>
    </div>
  );
}
