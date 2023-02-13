const button = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const buttonCl = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let profileHead = document.querySelector('.profile__name');
let profileDisc = document.querySelector('.profile__nickname');

function handleFormSubmit(evt) {
   evt.preventDefault();

   profileHead.textContent = nameInput.value;
   profileDisc.textContent = jobInput.value;
   
   popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


function pop() {
   nameInput.value = profileHead.textContent;
   jobInput.value = profileDisc.textContent;
   popup.classList.add('popup_opened');
}

function cls() {
   popup.classList.remove('popup_opened');
}

button.addEventListener('click', pop);
buttonCl.addEventListener('click', cls);