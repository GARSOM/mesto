import Card from "./Card.js";
import FormValidator from "./FormValidator.js"

const blockContainer = document.querySelector('.photo__elements');
const profileEditButtonOpenPopup = document.querySelector('.profile__button');
const profileEditPopup = document.querySelector('.popup_profile');
const profileEditNameInput = document.querySelector('.popup__input-name');
const profileEditjobInput = document.querySelector('.popup__input-job');
const profileEditPopupForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileNick = document.querySelector('.profile__nickname');
const placeAddButtonOpenPopup = document.querySelector('.profile__add');
const placeAddPopup = document.querySelector('.popup_add-place');
const placeAddPopupForm = document.querySelector('.popup__form_place');
const nameInputPlace = placeAddPopupForm.querySelector('.popup__input_place-name');
const linkInputPlace = placeAddPopupForm.querySelector('.popup__input_place-link');
const imageShowPopup = document.querySelector('.popup_type_show-image');

function createCard(data) {
   const card = new Card(data, '#white-template')
   return card.getCard();
}

initialCards.forEach(function (item) {
   const newCard = createCard(item)
   blockContainer.append(newCard);
});

export const openPopup = (popup) => {
   popup.classList.add('popup_opened')
   document.addEventListener('keydown', closeByEsc)
}
profileEditButtonOpenPopup.addEventListener('click', () => {
   profileEditNameInput.value = profileName.textContent
   profileEditjobInput.value = profileNick.textContent
   openPopup(profileEditPopup);
});

export const closePopup = (popup) => {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEsc)
}

profileEditPopupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   profileName.textContent = profileEditNameInput.value;
   profileNick.textContent = profileEditjobInput.value;
   closePopup(profileEditPopup);
})

placeAddButtonOpenPopup.addEventListener('click', () => {
   openPopup(placeAddPopup);
});


document.querySelectorAll('.popup__close').forEach(button => {
   const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
   button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

// Связываем input загрузки фото со строками, чтобы информация со строк сохранялась Название и ссылка
const handlePhotoSubmit = (evt) => {
   evt.preventDefault();
   const addWhiteData = {
      name: nameInputPlace.value,
      link: linkInputPlace.value
   };
   placeAddPopupForm.reset();
   evt.submitter.classList.add('popup__submit_disabled')
   evt.submitter.disabled = true;
   blockContainer.prepend(createCard(addWhiteData));
   closePopup(placeAddPopup);
};

placeAddPopupForm.addEventListener('submit', handlePhotoSubmit);

function handleOverlayClick(evt) {
   if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
   }
};

function closeByEsc(evt) {
   if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
   }
}

profileEditPopup.addEventListener('mousedown', handleOverlayClick);
placeAddPopup.addEventListener('mousedown', handleOverlayClick);
imageShowPopup.addEventListener('mousedown', handleOverlayClick);


const validatorConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_active'
};

const profileValidator = new FormValidator(validatorConfig, profileEditPopup);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validatorConfig, placeAddPopup);
cardValidator.enableValidation();