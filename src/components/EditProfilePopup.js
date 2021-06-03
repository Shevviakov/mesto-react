import React from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function onChangeCallback(callback) {
    return (e) => {
      callback(e.target.value)
    }
  }

  function handleSubmit() {
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={name} onChange={onChangeCallback(setName)} name="fullname" id="fullname" minLength="2" maxLength="40" required />
        <span className="popup-form__input-error fullname-error"></span>
      </div>
      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={description} onChange={onChangeCallback(setDescription)} name="bio" id="bio" minLength="2" maxLength="200" required />
        <span className="popup-form__input-error bio-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
