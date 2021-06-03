import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const card = props.card;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-btn ${isOwn ? 'card__delete-btn_enabled' : ''}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`

  function handleCardClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="Кнопка лайка карточки"></button>
          <p className="card__like-counter"></p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} aria-label="Кнопка удаления карточки"></button>
    </article>
  );
}

export default Card;
