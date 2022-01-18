/* eslint-disable key-spacing */
import React from 'react';
import { addToCart, loadBeer } from '../../redux/actionCreators';
import { beerActionTypes, cartActionTypes } from '../../redux/actionTypes';
import { fireEvent, render, screen } from '../../utils/test.utils';
import Details from './details';

jest.mock('../../redux/actionCreators');

describe('Given a Details component', () => {
  describe('When is rendered with beer data', () => {
    beforeEach(() => {
      loadBeer.mockReturnValue({
        type: beerActionTypes.LOAD_BEER,
        beer: {
          id: '123', name: 'mahou', price: 2, stock: 1234,
        },
      });

      addToCart.mockReturnValue({
        type: cartActionTypes.ADD_TO_CART,
        beer: {
          id: '123', name: 'mahou', price: 2, stock: 1234,
        },
      });

      render(<Details />);
    });

    test('Then Cervezas should be in the document', () => {
      const buyButton = screen.getByText('Añadir al carro');
      expect(screen.getByText('Origen')).toBeInTheDocument();
      fireEvent.click(buyButton);
    });
  });
});
