import React from 'react';

import Popup from './Popup';

function PopupWithForm(props) {
  const [submitText, setSubmitText] = React.useState(props.submitText);

  React.useEffect(() => {
    if (!props.isOpen) {
      setSubmitText(props.submitText)
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitText('Сохранение...')
    props.onSubmit()
  }
  return (
    <Popup
      name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__container">
        <form className="popup-form" id={`${props.name}`} name={`${props.name}`} onSubmit={handleSubmit} noValidate>
          <h2 className="popup-form__title">{props.title}</h2>
          {props.children}
          <button className="popup-form__save-btn" type="submit">{submitText}</button>
        </form>
      </div>
    </Popup>
  )
}

export default PopupWithForm;
