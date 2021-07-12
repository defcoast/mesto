import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._photoViewImage = this.popupElement.querySelector('.popup__image');
    this._photoViewCaption = this.popupElement.querySelector('.popup__caption');
  }

  open({ name, link }) {
    super.open();

    this._photoViewImage.src = link;
    this._photoViewCaption.textContent = name;
    this._photoViewImage.alt = name;
  }
}
