/* eslint-disable react/function-component-definition */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadBeer, addToCart } from '../../redux/actionCreators';
import './details.css';

export default function BeerDetails() {
  const beer = useSelector((store) => store.beer);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBeer(id));
  }, [dispatch]);

  function handleAddClick(item) {
    dispatch(addToCart(item));
  }

  return (
    <div className="details-card">
      <img className="details-card__image" src={beer.image} alt={beer.name} />
      <h2 className="details-card__name">{beer.name}</h2>
      <h3 className="details-card__prop">Origen</h3>
      <p className="details-card__p">
        {beer.origin}
      </p>
      <h3 className="details-card__prop">Descripción</h3>
      <p className="details-card__p">
        {beer.description}
      </p>
      <h3 className="details-card__prop">Contenido en alcohol</h3>
      <p className="details-card__p">
        {beer.alcoholContent}
      </p>
      <h3 className="details-card__prop">Tipo de fermentación</h3>
      <p className="details-card__p">
        {beer.fermentationType}
      </p>
      <h3 className="details-card__prop">Color</h3>
      <p className="details-card__p">
        {beer.color}
      </p>
      <h3 className="details-card__prop">IBU</h3>
      <p className="details-card__p">
        {beer.ibu}
      </p>
      <h3 className="details-card__prop">Precio</h3>
      <p className="details-card__p">
        {beer.price}
      </p>
      {beer.stock > 0 ? (
        <button
          className="details-add"
          onClick={() => handleAddClick(beer._id)}
          type="button"
        >
          Añadir al carro
        </button>
      ) : ''}

    </div>
  );
}
