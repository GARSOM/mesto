const photoTemplate = document.getElementById('white-template'); // находим наш template и заносим в DOM
const blockContainer = document.querySelector('.photo__elements');
const editProfileButtonOpenPopup = document.querySelector('.profile__button');
const editProfilePopup = document.querySelector('.popup_profile');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close_profile');
const editProfileNameInput = document.querySelector('.popup__input-name');
const editProfilejobInput = document.querySelector('.popup__input-job');
const editProfilePopupForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileNick = document.querySelector('.profile__nickname');
const addPlaceButtonOpenPopup = document.querySelector('.profile__add');
const addPlacePopup = document.querySelector('.popup_add-place');
const addPlaceCloseButton = addPlacePopup.querySelector('.popup__close-add-place');
const addPlacePopupForm = document.querySelector('.popup__form_place');
const itemTemplate = photoTemplate.content.querySelector('.photo__white');
// функция которая на основе данных будет создавать элемент
const addWhite = (addWhiteData) => {
   //создание копии template
   const whiteElement = itemTemplate.cloneNode(true);
   const photoText = whiteElement.querySelector('.photo__text')
   const photoElement = whiteElement.querySelector('.photo__element')

   photoText.textContent = addWhiteData.name
   photoElement.src = addWhiteData.link
   photoElement.alt = addWhiteData.name

   const deleteButton = whiteElement.querySelector('.photo__basket');
   const likeButton = whiteElement.querySelector('.photo__like-button');

   // удаление карточки
   const handeleDelete = () => {
      whiteElement.remove();
   }
   // переключатель лайка
   const handeleLike = () => {
      likeButton.classList.toggle('photo__like-active')
   }
   // слушатели по клику для корзины и лайка 
   deleteButton.addEventListener('click', handeleDelete);
   likeButton.addEventListener('click', handeleLike);

   const showImagePopup = document.querySelector('.popup_type_show-image');
   const showImageImg = showImagePopup.querySelector('.popup__img');
   const showImageCaption = showImagePopup.querySelector('.popup__caption');
   const showImageClose = document.getElementById('popup__close_show-image');

   const showPopupWithImage = (evt) => {
      const elementImg = evt.target.closest('.photo__element');
      openPopup(showImagePopup);
      showImageImg.src = elementImg.src;
      showImageCaption.textContent = photoText.textContent;
      showImageImg.alt = addWhiteData.name;
   }
   photoElement.addEventListener('click', showPopupWithImage);
   showImageClose.addEventListener('click', () => {
      closePopup(showImagePopup);
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
}
// слушатель открытия popup
editProfileButtonOpenPopup.addEventListener('click', () => {
   editProfileNameInput.value = profileName.textContent
   editProfilejobInput.value = profileNick.textContent
   openPopup(editProfilePopup);
});

// функция закрытия popup
const closePopup = (popup) => {
   popup.classList.remove('popup_opened')
}
// слушатель закрытия popup
editProfileCloseButton.addEventListener('click', () => {
   closePopup(editProfilePopup);
});

// вешаем слушатель и Связываем input редактирования профиля со строками, чтобы информация со строк сохранялась имя и о себе

editProfilePopupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   profileName.textContent = editProfileNameInput.value;
   profileNick.textContent = editProfilejobInput.value;
   closePopup(editProfilePopup);
})
// слушатель открытия popup 2
addPlaceButtonOpenPopup.addEventListener('click', () => {
   openPopup(addPlacePopup);
});
// слушатель закрытия popup2
addPlaceCloseButton.addEventListener('click', () => {
   closePopup(addPlacePopup);
});

// Связываем input загрузки фото со строками, чтобы информация со строк сохранялась Название и ссылка
const handlePhotoSubmit = (evt) => {
   evt.preventDefault();
   const nameInputPlace = addPlacePopupForm.querySelector('.popup__input_place-name');
   const linkInputPlace = addPlacePopupForm.querySelector('.popup__input_place-link');
   const name = nameInputPlace.value;
   const link = linkInputPlace.value;

   const addWhiteData = {
      name,
      link,
   };

   addPlacePopupForm.reset();
   blockContainer.prepend(addWhite(addWhiteData));
   closePopup(addPlacePopup);
};
addPlacePopupForm.addEventListener('submit', handlePhotoSubmit);