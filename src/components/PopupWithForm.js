import React from 'react';

function PopupWithForm(props) {
  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="popup-form" id={`${props.name}`} name={`${props.name}`} noValidate>
          <h2 className="popup-form__title">{props.title}</h2>
          {props.children}
        </form>
        <button className="popup__close-btn" type="button" aria-label={`Кнопка закрытия формы ${props.title}`} onClick={props.onClose}></button>
      </div>
    </article>
  )
}

export default PopupWithForm;
