/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { beerActionTypes, cartActionTypes } from './actionTypes';

const api = 'http://localhost:3040';

function loadBeers() {
  return async (dispatch) => {
    try {
      const { data: beers } = await axios.get(`${api}/beer`);
      dispatch({ type: beerActionTypes.LOAD_BEERS, beers });
    } catch (err) {
      dispatch({ type: beerActionTypes.FAILED_LOAD_BEERS, err });
    }
  };
}

function loadBeer(id) {
  return async (dispatch) => {
    try {
      const { data: beer } = await axios.get(`${api}/beer/${id}`);
      dispatch({ type: beerActionTypes.LOAD_BEER, beer });
    } catch (err) {
      dispatch({ type: beerActionTypes.FAILED_LOAD_BEER, err });
    }
  };
}

function loadCart(id) {
  const token = JSON.parse(localStorage.getItem('user'));

  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`${api}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      dispatch({ type: cartActionTypes.LOAD_CART, cart });
    } catch (err) {
      dispatch({ type: cartActionTypes.FAILED_LOAD_CART, err });
    }
  };
}

function addToCart(id) {
  const token = JSON.parse(localStorage.getItem('user'));

  return async (dispatch) => {
    try {
      const { data: cart } = await axios.post(`${api}/cart`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        beerId: id,
      });
      dispatch({ type: cartActionTypes.ADD_TO_CART, cart });
    } catch (err) {
      dispatch({ type: cartActionTypes.FAILED_ADD_TO_CART, err });
    }
  };
}

function deleteFromCart(beerId) {
  const token = JSON.parse(localStorage.getItem('user'));

  return async (dispatch) => {
    try {
      const { data: cart } = await axios.delete(`${api}/cart`, {
        headers: {
          Authorization: `Bearer ${token.token}`,

        },
        data: {
          beerId,
        },
      });
      dispatch({ type: cartActionTypes.DELETE_TO_CART, cart });
    } catch (err) {
      dispatch({ type: cartActionTypes.FAILED_DELETE_TO_CART, err });
    }
  };
}

function buyCart() {
  const token = JSON.parse(localStorage.getItem('user'));

  return async (dispatch) => {
    try {
      const { data: cart } = await axios.patch(`${api}/cart`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      dispatch({ type: cartActionTypes.BUY_CART, cart });
    } catch (err) {
      dispatch({ type: cartActionTypes.FAILED_BUY_CART, err });
    }
  };
}

export {
  loadBeer, loadBeers, loadCart, addToCart, deleteFromCart, buyCart,
};
