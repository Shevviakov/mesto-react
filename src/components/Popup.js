import React from 'react';



function Popup(props) {
  function onBackgroundClick(e) {
      const targetClassList = e.target.classList;
      if (targetClassList.contains('popup'))
        props.onClose();
  }

  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={onBackgroundClick}>
      <div className="popup__container">
        {props.children}
        <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия попапа" onClick={props.onClose}></button>
      </div>
    </article>
  )
}

export default Popup;
