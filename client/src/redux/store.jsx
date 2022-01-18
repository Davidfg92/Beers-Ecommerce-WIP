import {
  combineReducers, applyMiddleware, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import beersReducer, { selectedBeer } from './beersReducer';
import selectedCart from './cartReducer';

export default function configureStore(preloadState) {
  const rootReducer = combineReducers({
    beers: beersReducer,
    beer: selectedBeer,
    cart: selectedCart,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
