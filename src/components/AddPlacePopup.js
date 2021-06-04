import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [isValid, setIsValid] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState([]);


  React.useEffect(() => {
    if (!props.isOpen) {
      setLink('');
      setName('');
      setErrorMessages({});
      setIsValid(false);
    }
  }, [props.isOpen]);

  function onChangeCallback(callback) {
    return (e) => {
      const inputElement = e.target;
      const inputName = inputElement.name;
      const errMessage = inputElement.validationMessage;
      const newErrorMessages = {...errorMessages, [inputName]: errMessage};
      setErrorMessages(newErrorMessages);
      setIsValid(Object.values(newErrorMessages).every(err => !err))

      callback(e.target.value)
    }
  }

  function handleSubmit() {
    props.onAddPlace({name, link});
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={name} onChange={onChangeCallback(setName)} name="placename" id="placename" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup-form__input-error popup-form__input-error_active placename-error">{errorMessages['placename']}</span>
      </div>
      <div className="popup-form__field">
        <input className="popup-form__input" type="url" name="link" value={link} onChange={onChangeCallback(setLink)} id="link" placeholder="Ссылка на картинку" required />
        <span className="popup-form__input-error popup-form__input-error_active link-error">{errorMessages['link']}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
