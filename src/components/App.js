import React from 'react';

import Api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import CardDeleteConfirmationPopup from './CardDeleteConfirmationPopup';


function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isCardDeleteConfirmationPopupOpen, setCardDeleteConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [onCardDeletionConfirm, setCardDeletionConfirm] = React.useState(() => () => {})


  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards() ])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      });
  }, []);

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
    setCardDeleteConfirmationPopupOpen(false);
    setSelectedCard(null);
    setCardDeletionConfirm(() => () => {})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      });
  }

  function handleCardDelete(card) {
    setCardDeletionConfirm(() => () => {
        Api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups()
        })
        .catch(res => {
          console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
        })
    });
    setCardDeleteConfirmationPopupOpen(true);

  }

  function handleUpdateUser(newUser) {
    Api.setUserInfo(newUser)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
  }

  function handleAvatarUpdate(newAvatar) {
    Api.setAvatar(newAvatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
  }

  function handleAddPlace(newCard) {
    Api.addNewCard(newCard)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups()
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          >
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <CardDeleteConfirmationPopup isOpen={isCardDeleteConfirmationPopupOpen} onClose={closeAllPopups} onCardDeletionConfirm={onCardDeletionConfirm}/>
          </Main>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
