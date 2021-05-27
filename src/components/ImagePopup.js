import React from 'react';

function ImagePopup(props) {
  const card = props.card

  return(
    <article className={`popup popup_type_image-popup ${card ? 'popup_opened' : ''}`} aria-label="Просмотр карточки">
      <div className="popup__container">
        <figure className="image-popup">
          <img className="image-popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <figcaption className="image-popup__title">{card ? card.name : ''}</figcaption>
        </figure>
        <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия прсмотра изображения" onClick={props.onClose} style={{visibility: card ? 'visible' : 'hidden'}} ></button>
      </div>
    </article>
  )
}

export default ImagePopup;
