/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';

import Beerspage from './Beerspage';

describe('When beerspage called', () => {
  test('Then print beerspage', () => {
    render(
      <Beerspage />,
    );

    expect();
  });
});
