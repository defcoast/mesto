import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this.link;
    // this.name;
  }

  open() {
    super.open();
    const photoView = this.popupElement;
    const photoViewImage = photoView.querySelector('.popup__image');
    const photoViewCaption = photoView.querySelector('.popup__caption');

    // photoViewImage.src = this._link;
    // photoViewCaption.textContent = this._name;
    // photoViewImage.alt = this._name;

    // photoViewImage.src = 'https://clck.ru/VViea';
    // photoViewCaption.textContent = 'я заеб';
    // photoViewImage.alt = this._name;
  }
}
