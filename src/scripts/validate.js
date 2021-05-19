const showInputError = (form, input, config) => {
  // Подключаем span для вывода ошибки
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = input.validationMessage;

  input.classList.add(config.inputErrorClass);
  errorSpan.classList.add(config.errorClass);
}


const hideInputError = (form, input, config) => {
  // Подключаем span для вывода ошибки
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = input.validationMessage;

  input.classList.remove(config.inputErrorClass);
  errorSpan.classList.remove(config.errorClass);
}


const hazInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
}


const checkValidation = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}


const checkButtonState = (button, inputList) => {
  if (hazInvalidInput(inputList)) {
    button.disabled = true
  } else {
    button.disabled = false;
  }
}


const setEventListener = (form, config) => {
  
  // Отключаем стандартное поведение сабмита
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  // Подкключаем все инпуты в форме и конпку
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidation(form, input, config);
      checkButtonState(button, inputList);
    })
  })

  checkButtonState(button, inputList);
}


const enableValidation = (config) => {
  // Подключаем все формы на сайте
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Добавляем слушателей каждой форме на сайте
  formList.forEach((form) => {
    setEventListener(form, config);
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 