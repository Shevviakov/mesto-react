import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarUrlInput = React.createRef()

  const [isValid, setIsValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!props.isOpen) {
      avatarUrlInput.current.value='';
      setIsValid(false);
      setErrorMessage('');
    }
  }, [props.isOpen, avatarUrlInput, errorMessage]);

  function handleSubmit() {
    props.onUpdateAvatar({
      avatar: avatarUrlInput.current.value,
    });
  }

  function validateInput(e) {
    setIsValid(avatarUrlInput.current.validity.valid)
    setErrorMessage(avatarUrlInput.current.validationMessage);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <div className="popup-form__field">
        <input ref={avatarUrlInput} onChange={validateInput} className="popup-form__input" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup-form__input-error popup-form__input-error_active avatar-error">{errorMessage}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
