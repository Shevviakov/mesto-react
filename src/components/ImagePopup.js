import React from 'react';

import Popup from './Popup';

function ImagePopup(props) {
  const card = props.card

  return(
    <Popup name="image-popup" isOpen={!!card} onClose={props.onClose}>
        <figure className="image-popup">
          <img className="image-popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <figcaption className="image-popup__title">{card ? card.name : ''}</figcaption>
        </figure>
    </Popup>
  )
}

export default ImagePopup;
