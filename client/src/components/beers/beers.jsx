/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadBeers } from '../../redux/actionCreators';
import './beers.css';

export default function Beers() {
  const [input, setInput] = useState('');
  const allBeers = useSelector((store) => store.beers);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(allBeers);
  }, [allBeers]);

  useEffect(() => {
    dispatch(loadBeers());
  }, [dispatch]);

  useEffect(() => {
    if (input.length) {
      const newList = list.filter(
        (el) => el.name.toLowerCase().includes(input.trim().toLowerCase()),
      );
      setList(newList);
    } else {
      setList(allBeers);
    }
  }, [input]);

  return (
    <>
      <h2 className="beers-title">Cervezas</h2>
      <div className="search">
        <input
          className="text-input"
          value={input}
          type="text"
          placeholder="Busca tu cerveza..."
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div className="card">
        {list.map((beer) => (
          <div className="card__item" key={beer._id}>
            <div className="card__beer">
              <Link className="card__link" to={`/beer/${beer._id}`}>
                <div className="card__cover">
                  <img
                    className="card__image"
                    src={beer.image}
                    alt={beer.brand}
                  />
                </div>
                <div className="card__content">
                  <h2 className="card__title">{beer.name}</h2>
                  {beer.stock > 0 ? (
                    <p className="card__p card__p--stock">
                      En stock
                    </p>
                  ) : (
                    <p className="card__p card__p--no-stock">
                      Fuera de stock
                    </p>
                  )}

                  <p className="card__p">
                    {beer.price}
                    €
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
