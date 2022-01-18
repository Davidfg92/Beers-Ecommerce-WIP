/* eslint-disable no-empty */
/* eslint-disable no-lone-blocks */
import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import CartDetails from './cart';
import { cartActionTypes } from '../../redux/actionTypes';
import { loadCart, deleteFromCart, buyCart } from '../../redux/actionCreators';

jest.mock('../../redux/actionCreators');

describe('Given a Cart component', () => {
  describe('When is rendered with cart data', () => {
    beforeEach(() => {
      loadCart.mockReturnValue({
        type: cartActionTypes.LOAD_CART,
        cart: {
          beers: [
            {
              beer: { id: '123', name: 'mahou', price: 2 },
              amount: 12,
            },
          ],
        },
      });

      deleteFromCart.mockReturnValue({
        type: cartActionTypes.DELETE_TO_CART,
        cart: {
          beer: { id: '123', name: 'mahou', price: 2 },
          amount: 12,
        },
      });

      buyCart.mockReturnValue({
        type: cartActionTypes.BUY_CART,
        cart: {
          beer: { id: '123', name: 'mahou', price: 2 },
          amount: 12,
        },
      });

      render(
        <CartDetails />,
      );
    });

    test('Then carrito should be in the document', () => {
      const deleteButton = screen.getByText('X');
      const buyButton = screen.getByText('Comprar');

      expect(screen.getByText('X')).toBeInTheDocument();

      fireEvent.click(deleteButton);
      fireEvent.click(buyButton);
    });
  });
});

describe('Given a Cart component', () => {
  describe('When is rendered without cart data', () => {
    const initialState = {
      cart: [{
      }],
    };
    beforeEach(() => {
      loadCart.mockReturnValueOnce({
        type: cartActionTypes.FAILED_LOAD_CART,
        initialState,
      });
      render(<CartDetails />);
    });

    test('Then Cervezas should be in the document', () => {
      expect(screen.getByText('Tu carrito')).toBeInTheDocument();
    });
  });
});
