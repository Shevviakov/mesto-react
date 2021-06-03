import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (!props.isOpen) {
      setLink('');
      setName('');
    }
  }, [props.isOpen]);

  function onChangeCallback(callback) {
    return (e) => {
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
    >
      <div className="popup-form__field">
        <input className="popup-form__input" type="text" value={name} onChange={onChangeCallback(setName)} name="placename" id="placename" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup-form__input-error placename-error"></span>
      </div>
      <div className="popup-form__field">
        <input className="popup-form__input" type="url" name="link" value={link} onChange={onChangeCallback(setLink)} id="link" placeholder="Ссылка на картинку" required />
        <span className="popup-form__input-error link-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
