const showInputError = (form, input) => {
  // Подключаем span для вывода ошибки
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = input.validationMessage;

  input.classList.add(config.inputErrorClass);
  errorSpan.classList.add(config.errorClass);
};

const hideInputError = (form, input) => {
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = '';

  input.classList.remove(config.inputErrorClass);
  errorSpan.classList.remove(config.errorClass);
};

const hazInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // Подкключаем все инпуты в форме и конпку
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const button = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidation(input);
        this._checkButtonState(button, inputList);
      });
    });
  }

  _checkValidation(input) {
    if (!input.validity.valid) {
      showInputError(this._form, input);
    } else {
      hideInputError(this._form, input);
    }
  }

  _checkButtonState(button, inputList) {
    if (hazInvalidInput(inputList)) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }
}

function startValidation() {
  const editProfileMenu = document.querySelector('#edit-popup');
  const editProfileForm = editProfileMenu.querySelector('.popup__form');
  const editForm = new FormValidator(config, editProfileForm);
  editForm.enableValidation();

  const createPlaceMenu = document.querySelector('#add-popup');
  const createForm = createPlaceMenu.querySelector('.popup__form');
  const createFormEl = new FormValidator(config, createForm);
  createFormEl.enableValidation();
}

startValidation();
