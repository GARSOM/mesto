const photoTemplate = document.getElementById('white-template'); // находим наш template и заносим в DOM
const blockContainer = document.querySelector('.photo__elements');
const buttonOpenPopupName = document.querySelector('.profile__button');
const popupName = document.querySelector('.popup_profile');
const closePopupButton = document.querySelector('.popup__close_profile')
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');
const profileForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileNick = document.querySelector('.profile__nickname');
const buttonAdd = document.querySelector('.profile__add');
const popupPlace = document.querySelector('.popup_second');
const popupClosePlace = document.querySelector('.popup__close-second');
const editPhotoForm = document.querySelector('.popup__form_place');

// функция которая на основе данных будет создавать элемент
const addWhite = (addWhiteData) => {
   //создание копии template
   const whiteElement = photoTemplate.content
      .querySelector('.photo__white')
      .cloneNode(true);

   const photoText = whiteElement.querySelector('.photo__text')
   const photoElement = whiteElement.querySelector('.photo__element')

   photoText.textContent = addWhiteData.name
   photoElement.src = addWhiteData.link

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

   const popupFull = document.querySelector('.popup_full');
   const elementFullImg = document.querySelector('.popup_full_img');
   const elementFullCaption = document.querySelector('.popup_full_caption');
   const popupFullClose = document.querySelector('.popup_full_close');

   const addFullContent = (evt) => {
      const elementImg = evt.target.closest('.photo__element');
      openPopup(popupFull);
      elementFullImg.src = elementImg.src;
      elementFullCaption.textContent = photoText.textContent;
   }
   photoElement.addEventListener('click', addFullContent);
   popupFullClose.addEventListener('click', () => {
      closePopup(popupFull);
   });

   return whiteElement; //возвращаем элемент
};

// добавление карточки с помощью Prepend, чтобы добавлять в начало
const renderAddWhite = (whiteElement) => {
   blockContainer.prepend(whiteElement)
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
buttonOpenPopupName.addEventListener('click', () => {
   openPopup(popupName);
});

// функция закрытия popup
const closePopup = (popup) => {
   popup.classList.remove('popup_opened')
}
// слушатель закрытия popup
closePopupButton.addEventListener('click', () => {
   closePopup(popupName);
});

// вешаем слушатель и Связываем input редактирования профиля со строками, чтобы информация со строк сохранялась имя и о себе

profileForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileNick.textContent = jobInput.value;
   closePopup(popupName);
})
// слушатель открытия popup 2
buttonAdd.addEventListener('click', () => {
   openPopup(popupPlace);
});
// слушатель закрытия popup2
popupClosePlace.addEventListener('click', () => {
   closePopup(popupPlace);
});
// Связываем input загрузки фото со строками, чтобы информация со строк сохранялась Название и ссылка
const handlePhotoSubmit = (evt) => {
   evt.preventDefault();
   const nameInput = editPhotoForm.querySelector('.popup__input_place-name');
   const linkInput = editPhotoForm.querySelector('.popup__input_place-link');
   const name = nameInput.value;
   const link = linkInput.value;
   const addWhiteData = {
      name,
      link,
   };
   renderAddWhite(addWhite(addWhiteData));
   closePopup(popupPlace);
};
editPhotoForm.addEventListener('submit', handlePhotoSubmit)