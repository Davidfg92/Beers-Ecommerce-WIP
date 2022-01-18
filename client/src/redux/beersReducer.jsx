/* eslint-disable default-param-last */
import { beerActionTypes } from './actionTypes';

const initialBeers = [];
const initialBeer = {};

export default function beersReducer(beers = initialBeers, action) {
  let nextBeers = beers;
  switch (action.type) {
    case beerActionTypes.LOAD_BEERS:
      nextBeers = action.beers;
      break;

    default:
      break;
  }

  return nextBeers;
}

export function selectedBeer(beer = initialBeer, action) {
  let detailBeer = beer;
  switch (action.type) {
    case beerActionTypes.LOAD_BEER:
      detailBeer = action.beer;
      break;

    default:
      break;
  }

  return detailBeer;
}
