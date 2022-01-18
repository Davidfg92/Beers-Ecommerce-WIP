import axios from 'axios';
import {
  loadBeers, loadBeer, loadCart, addToCart, buyCart, deleteFromCart,
} from './actionCreators';
import { beerActionTypes, cartActionTypes } from './actionTypes';

jest.mock('axios');

describe('Given the actionCreators file', () => {
  const response = {
    data: [
      { _id: '121', name: 'mahou' },
    ],
  };

  const beer = {
    _id: '91623',
    name: 'mahou',
  };

  const dispatch = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('When the loadBeers is called', () => {
    test('Then the dispatch actionType and peyload of loadBeers', async () => {
      axios.get.mockResolvedValue(Promise.resolve(response));

      await loadBeers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: beerActionTypes.LOAD_BEERS,
        beers: response.data,
      });
    });
  });

  describe('When the loadBeers is called', () => {
    test('Then error is called', async () => {
      axios.get.mockRejectedValue();

      await loadBeers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: beerActionTypes.FAILED_LOAD_BEERS,
      });
    });
  });

  describe('When the loadBeer is called', () => {
    test('Then the dispatch actionType and payload of loadBeer', async () => {
      axios.get.mockResolvedValue(Promise.resolve(response));

      await loadBeer()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: beerActionTypes.LOAD_BEER,
        beer: response.data,
      });
    });
  });

  describe('When the loadBeer is called', () => {
    test('Then error is called', async () => {
      axios.get.mockRejectedValue();

      await loadBeer()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: beerActionTypes.FAILED_LOAD_BEER,
      });
    });
  });

  describe('When the loadCart is called', () => {
    test('Then the dispatch actionType and payload of loadCart', async () => {
      const localStorageMock = (function () {
        let store = {
          user: {
            token: '123',
          },
        };
        return {
          getItem(key) {
            return store[key];
          },
          setItem(key, value) {
            store[key] = value.toString();
          },
          clear() {
            store = {};
          },
          removeItem(key) {
            delete store[key];
          },
        };
      }());
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      JSON.parse = jest.fn().mockImplementationOnce(() => {
        'user: { token: "123"}';
      });
      axios.get.mockResolvedValue(Promise.resolve(response));

      await loadCart('test')(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.LOAD_CART,
        cart: response.data,
      });
    });
  });

  describe('When the loadCart is called', () => {
    test('Then error is called', async () => {
      axios.get.mockRejectedValue();

      await loadCart()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.FAILED_LOAD_CART,
      });
    });
  });

  describe('When the addToCart is called', () => {
    test('Then the dispatch actionType and payload of addToCart', async () => {
      const localStorageMock = (function () {
        let store = {
          user: {
            token: '123',
          },
        };
        return {
          getItem(key) {
            return store[key];
          },
          setItem(key, value) {
            store[key] = value.toString();
          },
          clear() {
            store = {};
          },
          removeItem(key) {
            delete store[key];
          },
        };
      }());

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      axios.post.mockResolvedValue(Promise.resolve(response));

      await addToCart(beer)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.ADD_TO_CART,
        cart: response.data,
      });
    });
  });

  describe('When the addToCart is called', () => {
    test('Then error is called', async () => {
      axios.post.mockRejectedValue();

      await addToCart()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.FAILED_ADD_TO_CART,
      });
    });
  });

  describe('When the buyCart is called', () => {
    test('Then the dispatch actionType and payload of buyCart', async () => {
      const localStorageMock = (function () {
        let store = {
          user: {
            token: '123',
          },
        };
        return {
          getItem(key) {
            return store[key];
          },
          setItem(key, value) {
            store[key] = value.toString();
          },
          clear() {
            store = {};
          },
          removeItem(key) {
            delete store[key];
          },
        };
      }());

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      axios.patch.mockResolvedValue(Promise.resolve(response));

      await buyCart()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.BUY_CART,
        cart: response.data,
      });
    });
  });

  describe('When the buyCart is called', () => {
    test('Then error is called', async () => {
      axios.patch.mockRejectedValue();

      await buyCart()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.FAILED_BUY_CART,
      });
    });
  });

  describe('When the deleteFromCart is called', () => {
    test('Then the dispatch actionType and payload of deleteFromCart', async () => {
      const localStorageMock = (function () {
        let store = {
          user: {
            token: '123',
          },
        };
        return {
          getItem(key) {
            return store[key];
          },
          setItem(key, value) {
            store[key] = value.toString();
          },
          clear() {
            store = {};
          },
          removeItem(key) {
            delete store[key];
          },
        };
      }());

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      axios.delete.mockResolvedValue(Promise.resolve(response));

      await deleteFromCart('12')(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.DELETE_TO_CART,
        cart: response.data,
      });
    });
  });

  describe('When the deleteFromCart is called', () => {
    test('Then error is called', async () => {
      axios.delete.mockRejectedValue();

      await deleteFromCart()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: cartActionTypes.FAILED_DELETE_TO_CART,
      });
    });
  });
});
