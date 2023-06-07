export const validatorConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const imageShowPopup = document.querySelector('.popup_type_show-image');
export const imageShowImg = imageShowPopup.querySelector('.popup__img');
export const imageShowCaption = imageShowPopup.querySelector('.popup__caption');
export const profileEditButtonOpenPopup = document.querySelector('.profile__button');
export const profileEditPopup = document.querySelector('.popup_profile');
export const profileEditNameInput = document.querySelector('.popup__input-name');
export const profileEditjobInput = document.querySelector('.popup__input-job');
export const profileEditPopupForm = document.querySelector('.popup__form_profile');
export const profileName = document.querySelector('.profile__name');
export const profileNick = document.querySelector('.profile__nickname');
export const placeAddButtonOpenPopup = document.querySelector('.profile__add');
export const placeAddPopup = document.querySelector('.popup_add-place');
export const placeAddPopupForm = document.querySelector('.popup__form_place');
export const nameInputPlace = placeAddPopupForm.querySelector('.popup__input_place-name');
export const linkInputPlace = placeAddPopupForm.querySelector('.popup__input_place-link');
export const blockContainer = document.querySelector('.photo__elements');