import { showInputError, hideInputError, hazInvalidInput } from './index.js';

export default class FormValidator {
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
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidation(input);
        this._checkButtonState();
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

  _checkButtonState() {
    if (hazInvalidInput(this._inputList)) {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }
  }
}
