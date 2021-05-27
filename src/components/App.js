import React from 'react';

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
        >
          <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <div className="popup-form__field">
              <input className="popup-form__input" type="text" name="fullname" id="fullname" minLength="2" maxLength="40" required />
              <span className="popup-form__input-error fullname-error"></span>
            </div>
            <div className="popup-form__field">
              <input className="popup-form__input" type="text" name="bio" id="bio" minLength="2" maxLength="200" required />
              <span className="popup-form__input-error bio-error"></span>
            </div>
            <button className="popup-form__save-btn" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <div className="popup-form__field">
              <input className="popup-form__input" type="text" name="placename" id="placename" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="popup-form__input-error placename-error"></span>
            </div>
            <div className="popup-form__field">
              <input className="popup-form__input" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
              <span className="popup-form__input-error link-error"></span>
            </div>
            <button className="popup-form__save-btn" type="submit">Создать</button>
          </PopupWithForm>
          <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <div className="popup-form__field">
              <input className="popup-form__input" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
              <span className="popup-form__input-error avatar-error"></span>
            </div>
            <button className="popup-form__save-btn" type="submit">Сохранить</button>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
