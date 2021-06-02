export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;

    // Подкключаем все инпуты в форме и конпку
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidation(input);
        this.checkButtonState();
      });
    });
  }

  _checkValidation(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this.hideInputError(input);
    }
  }

  checkButtonState() {
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _showInputError(input) {
    // Подключаем span для вывода ошибки
    const errorSpan = this._form.querySelector(`#${input.id}-error`);

    errorSpan.textContent = input.validationMessage;

    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
  }

  hideInputError(input) {
    const errorSpan = this._form.querySelector(`#${input.id}-error`);

    errorSpan.textContent = '';

    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
  }
}
