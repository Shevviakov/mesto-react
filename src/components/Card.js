import React from 'react';

function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-group">
          <button className="card__like-btn" type="button" aria-label="Кнопка лайка карточки"></button>
          <p className="card__like-counter"></p>
        </div>
      </div>
      <button className="card__delete-btn" type="button" aria-label="Кнопка удаления карточки"></button>
    </article>
  );
}

export default Card;
