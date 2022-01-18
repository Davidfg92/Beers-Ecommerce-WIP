/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable default-param-last */
import { cartActionTypes } from './actionTypes';

const initialCart = { beers: [], amount: '', totalPrice: 0 };

export default function selectedCart(cart = initialCart, action) {
  let detailCart = cart;
  switch (action.type) {
    case cartActionTypes.LOAD_CART:
      detailCart = action.cart;
      break;

    case cartActionTypes.ADD_TO_CART:
      detailCart = action.cart;
      break;

    case cartActionTypes.DELETE_TO_CART:
      detailCart = action.cart;
      break;

    case cartActionTypes.BUY_CART:
      detailCart = action.cart;
      break;

    default:
      break;
  }

  return detailCart;
}
