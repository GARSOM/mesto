import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../utils/cards.js";
import './index.css';

import {
   profileEditButtonOpenPopup, //Кнопка изменить Имя
   profileEditPopup, // Форма Имени
   profileEditNameInput, //Имя в Форме
   profileEditjobInput, //Ник в Форме
   profileName, //Имя в Блоке
   profileNick, //Ник в Блоке
   imageShowPopup, // Блок с фото на весь экран
   blockContainer, // Элемент с Карточками
   placeAddButtonOpenPopup, // Кнопка открыть форму для загрузки Фото
   placeAddPopup, // Форма для Фото
   validatorConfig
} from "../utils/constants.js"

const popupPhotocardImage = new PopupWithImage(imageShowPopup);

popupPhotocardImage.setEventListeners();

function createCard(item) {
   const card = new Card({
      data: item,
      handleCardClick: (name, link) => {
         popupPhotocardImage.open(name, link);
      }
   }, '#white-template');
   const cardElement = card.getCard();
   return cardElement;
}

const cardsContainer = new Section({
   items: initialCards,
   renderer: (item) => {
      cardsContainer.addItem(createCard(item))
   },
}, blockContainer);

cardsContainer.renderItems()

const userInfo = new UserInfo({ nameSelector: profileName, descriptionSelector: profileNick });

const popupProfileForm = new PopupWithForm(profileEditPopup, {
   handleFormSubmit: (inputValues) => {
      const data = {
         name: inputValues['input-name'],
         description: inputValues['input-job']
      }
      userInfo.setUserInfo(data);
   }
});
popupProfileForm.setEventListeners();

profileEditButtonOpenPopup.addEventListener('click', () => {
   profileValidator.resetValidation();
   popupProfileForm.open();
   const profileData = userInfo.getUserInfo();
   profileEditNameInput.value = profileData.name;
   profileEditjobInput.value = profileData.description
});

const popupAddImgForm = new PopupWithForm(placeAddPopup, {
   handleFormSubmit: (inputValues) => {
      const data = {
         name: inputValues['input-name-add-place'],
         link: inputValues['input-job-add-place']
      }
      cardsContainer.addNewItem(createCard(data));
   }
});
popupAddImgForm.setEventListeners()

placeAddButtonOpenPopup.addEventListener('click', () => {
   popupAddImgForm.open();
   cardValidator.resetValidation();
});

const profileValidator = new FormValidator(validatorConfig, profileEditPopup);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validatorConfig, placeAddPopup);
cardValidator.enableValidation();


