import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import Register from './register';

describe('When login component is called', () => {
  beforeEach(() => {
    render(
      <Register />,
    );
  });
  test('Then print register form', () => {
    const inputEmail = screen.getByPlaceholderText('email');
    const inputName = screen.getByPlaceholderText('name');
    const inputPassword = screen.getByPlaceholderText('password');
    const loginButton = screen.getByRole('button');

    fireEvent.change(inputName, { target: { value: 'Anusqui' } });
    fireEvent.change(inputEmail, { target: { value: 'anusqui@isdi.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234' } });

    expect(inputName.value).toBe('Anusqui');
    expect(inputPassword.value).toBe('1234');

    fireEvent.click(loginButton);
  });
});
