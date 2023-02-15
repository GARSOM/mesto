const buttonProfileEdit = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const buttonCloseEdit = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#popup__input-name');
let jobInput = document.querySelector('#popup__input-job');
let profileHead = document.querySelector('.profile__name');
let profileDisc = document.querySelector('.profile__nickname');

function handleFormSubmit(evt) {// обработчик формы
   evt.preventDefault();
   
   profileHead.textContent = nameInput.value;
   profileDisc.textContent = jobInput.value;
   closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

function openPopup() {
   nameInput.value = profileHead.textContent;
   jobInput.value = profileDisc.textContent;
   popup.classList.add('popup_opened');
}

function closePopup() {
   popup.classList.remove('popup_opened');
}

buttonProfileEdit.addEventListener('click', openPopup);
buttonCloseEdit.addEventListener('click', closePopup);