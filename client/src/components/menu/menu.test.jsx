/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '../../utils/test.utils';
import Menu from './menu';

describe('When menu is called', () => {
  test('Then dont have user in localstorage called 3 links', () => {
    render(

      <Menu />,

    );
    expect(screen.queryAllByRole('link')).toHaveLength(3);
  });
});

describe('When menu is called', () => {
  test('Then have user in localstorage called 4 links', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'user'),
        setItem: jest.fn(() => 'user'),
      },
      writable: true,
    });

    JSON.parse = jest.fn().mockImplementationOnce(() => {
    });

    render(
      <Menu />,
    );

    expect(jest.spyOn(localStorage, 'getItem').mockImplementation(() => 'user'));
  });
});
