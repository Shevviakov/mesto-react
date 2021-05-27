import React from 'react';

import Api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Api.getUserInfo()
      .then(({name, about, avatar}) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      });
  }, []);

  React.useEffect(() => {
    Api.getInitialCards()
      .then(cards => {
        setCards(cards)
      })
      .catch(res => {
        console.log(`Error '${res.status} ${res.statusText}' ${res.url}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile page__profile">
        <button className="profile__avatar-btn" style={{ backgroundImage: `url(${userAvatar})` }} aria-label="Кнопка обновления аватара" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__fullname">{userName}</h1>
          <button className="profile__edit-btn" type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}></button>
          <p className="profile__bio">{userDescription}</p>
        </div>
        <button className="profile__add-card-btn" type="button" aria-label="Кнопка добавления новой карточки" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards page__cards" aria-label="Карточки мест">
        { cards.map( card => <Card key={card._id} card={card} onCardClick={props.onCardClick} /> ) }
      </section>
      {props.children}
      <article className="popup popup_type_card-delete-confirmation">
        <div className="popup__container">
          <form className="popup-form" id="card-delete-confirmation-form" name="card-delete-confirmation-form" noValidate>
            <h2 className="popup-form__title">Вы уверены?</h2>
            <button className="popup-form__save-btn" type="submit">Да</button>
          </form>
          <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия формы редактирования профиля"></button>
        </div>
      </article>
    </main>
  )
}

export default Main;
