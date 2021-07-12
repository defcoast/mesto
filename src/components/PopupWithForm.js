import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCb, inputConfig) {
    super(popupSelector);
    this._submitFormCb = submitFormCb;
    this._inputConfig = inputConfig;
    this._formElement = this.popupElement.querySelector('.popup__form');

    this._createMenuNameInput = this._formElement.querySelector('#name');
    this._createMenuLinkInput = this._formElement.querySelector('#link');

    this.submitBtn = this._formElement.querySelector('.popup__save-btn');

    this.setEventListeners();
  }

  _getInputValues() {
    const result = {};
    const inputs = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    );
    inputs.forEach((input) => {
      result[input.name] = input.value;
    });

    return result;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const cardData = this._getInputValues();
      this._submitFormCb(cardData);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setData(data, card) {
    this.data = data;
    this.card = card;

  }

}
