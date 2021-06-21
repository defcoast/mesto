import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    super.open();

    const photoView = document.querySelector('#view-popup');
    const photoViewImage = photoView.querySelector('.popup__image');
    const photoViewCaption = photoView.querySelector('.popup__caption');

    photoViewImage.src = link;
    photoViewCaption.textContent = name;
    photoViewImage.alt = name;
  }
}
