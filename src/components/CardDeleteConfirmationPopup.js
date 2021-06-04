import React from 'react';

import PopupWithForm from './PopupWithForm';

function CardDeleteConfirmationPopup(props) {
  function handleSubmit() {
    props.onCardDeletionConfirm();
  }
  return (
    <PopupWithForm
      name="card-delete-confirmation"
      title="Вы уверены?"
      submitText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default CardDeleteConfirmationPopup;
