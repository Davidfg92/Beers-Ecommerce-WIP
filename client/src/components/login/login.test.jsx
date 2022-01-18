import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import Login from './login';

describe('When login component is called', () => {
  beforeEach(() => {
    render(
      <Login />,
    );
  });
  test('Then print login form', () => {
    const inputName = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button');

    fireEvent.change(inputName, { target: { value: 'anusqui@isdi.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234' } });

    expect(inputName.value).toBe('anusqui@isdi.com');
    expect(inputPassword.value).toBe('1234');

    fireEvent.click(loginButton);
  });

  test('Then print the logout form', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'user'),
        setItem: jest.fn(() => 'user'),
      },
      writable: true,
    });
  });
});
