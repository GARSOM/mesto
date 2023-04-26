const photoTemplate = document.getElementById('white-template'); // находим наш template и заносим в DOM
const blockContainer = document.querySelector('.photo__elements');
const profileEditButtonOpenPopup = document.querySelector('.profile__button');
const profileEditPopup = document.querySelector('.popup_profile');
const profileEditCloseButton = profileEditPopup.querySelector('.popup__close_profile');
const profileEditNameInput = document.querySelector('.popup__input-name');
const profileEditjobInput = document.querySelector('.popup__input-job');
const profileEditPopupForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileNick = document.querySelector('.profile__nickname');
const placeAddButtonOpenPopup = document.querySelector('.profile__add');
const placeAddPopup = document.querySelector('.popup_add-place');
const placeAddCloseButton = placeAddPopup.querySelector('.popup__close-add-place');
const placeAddPopupForm = document.querySelector('.popup__form_place');
const itemTemplate = photoTemplate.content.querySelector('.photo__white');
const imageShowPopup = document.querySelector('.popup_type_show-image');
const imageShowImg = imageShowPopup.querySelector('.popup__img');
const imageShowCaption = imageShowPopup.querySelector('.popup__caption');
const imageShowClose = document.getElementById('popup__close_show-image');
const nameInputPlace = placeAddPopupForm.querySelector('.popup__input_place-name');
const linkInputPlace = placeAddPopupForm.querySelector('.popup__input_place-link');

// функция которая на основе данных будет создавать элемент
const addWhite = (addWhiteData) => {
   //создание копии template
   const whiteElement = itemTemplate.cloneNode(true);
   const photoText = whiteElement.querySelector('.photo__text')
   const photoElement = whiteElement.querySelector('.photo__element')

   photoText.textContent = addWhiteData.name
   photoElement.src = addWhiteData.link
   photoElement.alt = addWhiteData.name

   const buttonDelete = whiteElement.querySelector('.photo__basket');
   const buttonLike = whiteElement.querySelector('.photo__like-button');

   // удаление карточки
   const handeleDelete = () => {
      whiteElement.remove();
   }
   // переключатель лайка
   const handeleLike = () => {
      buttonLike.classList.toggle('photo__like-active')
   }
   // слушатели по клику для корзины и лайка 
   buttonDelete.addEventListener('click', handeleDelete);
   buttonLike.addEventListener('click', handeleLike);

   const showPopupWithImage = () => {
      imageShowCaption.textContent = addWhiteData.name
      imageShowImg.src = addWhiteData.link;
      imageShowImg.alt = addWhiteData.name;
      openPopup(imageShowPopup);
   }
   photoElement.addEventListener('click', showPopupWithImage);

   imageShowClose.addEventListener('click', () => {
      closePopup(imageShowPopup);
   });

   return whiteElement; //возвращаем элемент
};

// добавление карточки с помощью Prepend, чтобы добавлять в начало
const renderAddWhite = (whiteElement) => {
   blockContainer.append(whiteElement)
};
// перебираем массив
initialCards.forEach((photoWhite) => {
   const element = addWhite(photoWhite)
   renderAddWhite(element)
});

// функция открытия popup
const openPopup = (popup) => {
   popup.classList.add('popup_opened')
   document.addEventListener('keydown', closeByEsc)
}
// слушатель открытия popup
profileEditButtonOpenPopup.addEventListener('click', () => {
   profileEditNameInput.value = profileName.textContent
   profileEditjobInput.value = profileNick.textContent
   openPopup(profileEditPopup);
});

// функция закрытия popup
const closePopup = (popup) => {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEsc)
}
// слушатель закрытия popup
profileEditCloseButton.addEventListener('click', () => {
   closePopup(profileEditPopup);
});

// вешаем слушатель и Связываем input редактирования профиля со строками, чтобы информация со строк сохранялась имя и о себе

profileEditPopupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   profileName.textContent = profileEditNameInput.value;
   profileNick.textContent = profileEditjobInput.value;
   closePopup(profileEditPopup);
})
// слушатель открытия popup 2
placeAddButtonOpenPopup.addEventListener('click', () => {
   openPopup(placeAddPopup);
});
// слушатель закрытия popup2

placeAddCloseButton.addEventListener('click', () => {
   closePopup(placeAddPopup);
});

// Связываем input загрузки фото со строками, чтобы информация со строк сохранялась Название и ссылка
const handlePhotoSubmit = (evt) => {
   evt.preventDefault();
   const name = nameInputPlace.value;
   const link = linkInputPlace.value;

   const addWhiteData = {
      name,
      link,
   };

   placeAddPopupForm.reset();
   evt.submitter.classList.add('popup__submit_disabled')
   evt.submitter.disabled = true;
   blockContainer.prepend(addWhite(addWhiteData));
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