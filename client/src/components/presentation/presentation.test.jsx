/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Presentation from './presentation';

describe('When the presentation is called', () => {
  test('Then have user in localstorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'user'),
        setItem: jest.fn(() => 'user'),
      },
      writable: true,
    });

    render(
      <Router>
        <Presentation />
      </Router>,
    );
    expect(jest.spyOn(localStorage, 'getItem').mockImplementation(() => 'user'));
    expect(screen.queryAllByRole('title')).toHaveLength(0);
  });
});
