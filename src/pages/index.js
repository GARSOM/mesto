import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';
import loading from "../utils/utils.js";

import {
   profileEditButtonOpenPopup, //Кнопка изменить Имя
   profileEditPopup, // Форма Имени
   profileEditNameInput, //Имя в Форме
   profileEditjobInput, //Ник в Форме
   profileNameSelector, //Имя в Блоке
   profileNickSelector, //Ник в Блоке
   imageShowPopup, // Блок с фото на весь экран
   blockContainer, // Элемент с Карточками
   placeAddButtonOpenPopup, // Кнопка открыть форму для загрузки Фото
   placeAddPopup, // Форма для Фото
   avatarOpenButton, // кнопка аватара
   popupAvatarBox, // форма смена аватара
   popupDelete, // конфирм удаления
   profileAvatarSelector, // Аватар
   validatorConfig // конфиг валидации
} from "../utils/constants.js";

let userId = 0;

const api = new Api({
   url: 'https://mesto.nomoreparties.co/v1/cohort-68',
   headers: {
      authorization: 'd500d7ec-67d0-43b8-8493-6158f5388f21',
      'Content-Type': 'application/json'
   }
})

Promise.all([api.getDataUser(), api.getInitialsCards()])
   .then(([data, cards]) => {
      userId = data._id;
      userInfo.setUserInfo(data);
      cardsContainer.renderItems(cards);
   })
   .catch((err) => {
      console.log(err);
   })

const popupPhotocardImage = new PopupWithImage(imageShowPopup);
popupPhotocardImage.setEventListeners();


const popupWithConfirm = new PopupWithConfirm(popupDelete);
popupWithConfirm.setEventListeners();

function createCard(data) {
   const card = new Card({
      data,
      handleCardClick: (name, link) => {
         popupPhotocardImage.open(name, link);

      }, handleDeleteClick: () => {
         popupWithConfirm.open();
         popupWithConfirm.submitCallback(() => {
            loading(popupDelete, 'Удаление...');
            api.deleteCard(card.getId())
               .then(() => {
                  card.deleteCard();
                  popupWithConfirm.close();
               })
               .catch((err) => {
                  console.log(`deleteCard - ошибка: ${err}`);
               })
               .finally(() => {
                  loading(popupDelete, 'Да')
               })
         })
      }, handleSetLike: (cardId) => {
         api.setLike(cardId)
            .then((data) => {
               card.handleLike(data)
            })
            .catch((err) => {
               console.log(`handleSetLike - ошибка: ${err}`);
            });
      },
      handleDeleteLike: (cardId) => {
         api.deleteLike(cardId)
            .then((data) => {
               card.handleLike(data);
            })
            .catch((err) => {
               console.log(`handleDeleteLike - ошибка: ${err}`);
            });
      },
   }, '#white-template', userId);
   return card.getCard();
}
const cardsContainer = new Section({
   renderer: (item) => {
      cardsContainer.addItem(createCard(item))
   }
}, blockContainer);


const userInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileNickSelector, avatarSelector: profileAvatarSelector });

const popupProfileForm = new PopupWithForm(profileEditPopup, {
   handleFormSubmit: (data) => {
      loading(profileEditPopup, 'Cохранение...');
      api.setUserData(data)
         .then((res) => {
            userInfo.setUserInfo(res);
            popupProfileForm.close();
         })
         .catch((err) => {
            console.log(`setDataUser - ошибка: ${err}`);
         })
         .finally(() => {
            loading(profileEditPopup, 'Сохранить');
         })
   }
})
popupProfileForm.setEventListeners();

profileEditButtonOpenPopup.addEventListener('click', () => {
   profileValidator.resetValidation();
   popupProfileForm.open();
   const profileData = userInfo.getUserInfo();
   profileEditNameInput.value = profileData.name;
   profileEditjobInput.value = profileData.about;
});


const popupAvatarForm = new PopupWithForm(popupAvatarBox, {
   handleFormSubmit: (data) => {
      loading(popupAvatarBox, 'Сохранение...');
      api.setUserAvatar(data)
         .then((res) => {
            userInfo.setUserInfo(res)
            popupAvatarForm.close();
         })
         .catch((err) => {
            console.log(`setUserAvatar - ошибка: ${err}`);
         })
         .finally(() => {
            loading(popupAvatarBox, 'Сохранить')
         })
   }
})
popupAvatarForm.setEventListeners();
avatarOpenButton.addEventListener('click', () => {
   avatarValidator.resetValidation();
   popupAvatarForm.open();
});

const popupAddImgForm = new PopupWithForm(placeAddPopup, {
   handleFormSubmit: (data) => {
      loading(popupAddImgForm, 'Сохранение...');
      api.addNewPhotocard(data.nameImg, data.linkImg)
         .then((res) => {
            cardsContainer.newAddItem(createCard(res));
            popupAddImgForm.close();
         })
         .catch((err) => {
            console.log(`addNewCard - ошибка: ${err}`);
         })
         .finally(() => {
            loading(popupAddImgForm, 'Создать');
         })
   }
})
popupAddImgForm.setEventListeners();

placeAddButtonOpenPopup.addEventListener('click', () => {
   cardValidator.resetValidation();
   popupAddImgForm.open();
});

const profileValidator = new FormValidator(validatorConfig, profileEditPopup);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validatorConfig, placeAddPopup);
cardValidator.enableValidation();

const avatarValidator = new FormValidator(validatorConfig, popupAvatarBox);
avatarValidator.enableValidation();