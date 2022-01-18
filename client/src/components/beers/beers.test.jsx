/* eslint-disable key-spacing */
import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import Beers from './beers';
import { loadBeers } from '../../redux/actionCreators';
import { beerActionTypes } from '../../redux/actionTypes';

jest.mock('../../redux/actionCreators');

describe('Given a Beers component', () => {
  describe('When is rendered with beer data', () => {
    const initialState = {
      beers: [{
        _id:'123',
        name: 'mahou',
        stock: 123,
        price: 2,
      }],
    };
    beforeEach(() => {
      loadBeers.mockReturnValueOnce({
        type: beerActionTypes.LOAD_BEERS,
        initialState,
      });
      render(<Beers />, initialState);
    });

    test('Then Cervezas should be in the document', () => {
      const inputBeer = screen.getByPlaceholderText('Busca tu cerveza...');
      fireEvent.change((inputBeer, { target: { value: 'mahou' } }));
      expect(screen.getByText('Cervezas')).toBeInTheDocument();
    });
  });
});

describe('Given a Beers component', () => {
  describe('When is rendered without beer data', () => {
    const initialState = {
      beers: [{
      }],
    };
    beforeEach(() => {
      loadBeers.mockReturnValueOnce({
        type: beerActionTypes.FAILED_LOAD_BEERS,
        initialState,
      });
      render(<Beers />, initialState);
    });

    test('Then Cervezas should be in the document', () => {
      expect(screen.getByText('Cervezas')).toBeInTheDocument();
    });
  });
});
