import React from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  const [errorMessages, setErrorMessages] = React.useState([]);


  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setErrorMessages({});
  }, [currentUser, props.isOpen]);

  function onChangeCallback(callback) {
    return (e) => {
      const inputElement = e.target;
      const inputName = inputElement.name;
      const errMessage = inputElement.validationMessage;
      setErrorMessages({...errorMessages, [inputName]: errMessage});

      callback(inputElement.value)
    }
  }

  function handleSubmit() {
    props.onUpdateUser({name, about});
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={Object.values(errorMessages).some(err => !!err)}
    >

      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={name} onChange={onChangeCallback(setName)} name="fullname" id="fullname" minLength="2" maxLength="40" required />
        <span className="popup-form__input-error popup-form__input-error_active fullname-error">{errorMessages['fullname']}</span>
      </div>
      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={about} onChange={onChangeCallback(setAbout)} name="bio" id="bio" minLength="2" maxLength="200" required />
        <span className="popup-form__input-error popup-form__input-error_active bio-error">{errorMessages['bio']}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
