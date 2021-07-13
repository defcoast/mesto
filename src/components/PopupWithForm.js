import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCb) {
    super(popupSelector);
    this._submitFormCb = submitFormCb;
    this._formElement = this.popupElement.querySelector('.popup__form');
    this.submitBtn = this._formElement.querySelector('.popup__save-btn');
    this._inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));

    this.setEventListeners();
  }

  _getInputValues() {
    const result = {};

    this._inputs.forEach((input) => {
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
