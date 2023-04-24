enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

//функция положительной Валидности
function setInputValidState(config, input, errorElement) {
  input.classList.remove(config.inputErrorClass) // удаляем подчеркивание
  errorElement.textContent = '';
}
//функиця отрицательной Валидности
function setInputInValidState(config, input, errorElement) {
  input.classList.add(config.inputErrorClass) // добавляем подчеркивание
  errorElement.classList.add(config.errorClass) // добавляем текст
  errorElement.textContent = input.validationMessage;
}
//функиця Валидности инпутов
function checkInputValidity(config, input) {
  const errorElement = document.querySelector(`#error-${input.id}`); // связываем input и span
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement); // вызов функции положительной Валидности
  } else {
    setInputInValidState(config, input, errorElement); // вызов функции отрицательной Валидности
  }
}
//функция неудачной валидации кнопки
function disabledButton({ inactiveButtonClass }, button) {
  button.setAttribute('disabled', '')
  button.classList.add(inactiveButtonClass);
}
//функция удачной валидации кнопки
function enableButton({ inactiveButtonClass }, button) {
  button.removeAttribute('disabled')
  button.classList.remove(inactiveButtonClass);
}

//функиця Валидности кнопки
function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
  const submitButton = form.querySelector(submitButtonSelector)

  if (form.checkValidity()) {
    enableButton(rest, submitButton);
  } else {
    disabledButton(rest, submitButton);
  }
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  //находим форму
  const form = document.querySelector(formSelector);
  const formArray = Array.from(form)
  formArray.forEach(function () {
  })

  //находим инпут
  const inputs = form.querySelectorAll(inputSelector)
  const inputsArray = Array.from(inputs)

  inputsArray.forEach(function (input) {
    input.addEventListener('input', () => {
      checkInputValidity(rest, input)
      toggleButtonValidity(rest, form)
    })
  })
}



// const openInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
//   const elementError = formElement.querySelector(`#error-${inputElement.id}`);
//   inputElement.classList.add(inputErrorClass);
//   elementError.textContent = errorMessage;
//   elementError.classList.add(errorClass);
// };

// const closeInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
//   const elementError = formElement.querySelector(`#error-${inputElement.id}`);
//   inputElement.classList.remove(inputErrorClass);
//   elementError.classList.remove(errorClass);
//   elementError.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, inputError) => {
//   if (!inputElement.validity.valid) {
//     openInputError(formElement, inputElement, inputElement.validationMessage, inputError);
//   } else {
//     closeInputError(formElement, inputElement, inputError);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute("disabled", true);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute("disabled", true);
//   }
// };

// const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, rest);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, rest);
//       toggleButtonState(inputList, buttonElement, rest);
//     });
//   });
// };

// const enableValidation = ({ formSelector, ...rest }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, rest);
//   });
// }

// enableValidation(validationConfig);