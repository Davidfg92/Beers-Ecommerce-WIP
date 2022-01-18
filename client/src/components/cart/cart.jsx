/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, deleteFromCart, loadCart } from '../../redux/actionCreators';
import './cart.css';

const CartDetails = function () {
  const cart = useSelector((store) => store.cart);

  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  let cartTotal = 0;

  useEffect(() => {
    dispatch(loadCart(user?.user?.cart));
  }, [dispatch]);

  function handleDeleteClick(item) {
    dispatch(deleteFromCart(item));
  }

  function handleBuyClick() {
    dispatch(buyCart());
  }

  return (
    <div className="card-cart">
      <h2 className="card-cart__title">Tu carrito</h2>
      {cart.beers && cart.beers.map((beer) => {
        const beerTotal = beer.beer.price * beer.amount;
        cartTotal += beerTotal;
        return (
          <div key={beer.beer._id} className="card-details">
            <p className="card-details__p">
              {beer.beer.name}
            </p>
            <p className="card-details__p">
              {beer.beer.price}
              €
            </p>
            <p className="card-details__p">
              Amount:
              {' '}
              {beer.amount}
            </p>
            <p className="card-details__p">
              Total price:
              {beerTotal}

            </p>
            <button
              className="card-details__button"
              onClick={() => handleDeleteClick(beer.beer._id)}
              type="button"
            >
              X
            </button>
          </div>
        );
      }) }

      <p>
        Total:
        {' '}
        {cartTotal}
      </p>

      <button
        className="card-details__button"
        onClick={() => handleBuyClick()}
        type="button"
      >
        Comprar
      </button>

    </div>
  );
};

export default CartDetails;
