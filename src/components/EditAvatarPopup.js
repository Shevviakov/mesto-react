import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarUrlInput = React.createRef()

  React.useEffect(() => {
    if (!props.isOpen) {
      avatarUrlInput.current.value='';
    }
  }, [props.isOpen, avatarUrlInput]);

  function handleSubmit() {
    props.onUpdateAvatar({
      avatar: avatarUrlInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup-form__field">
        <input ref={avatarUrlInput} className="popup-form__input" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup-form__input-error avatar-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
