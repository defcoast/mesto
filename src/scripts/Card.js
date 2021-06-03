import { showPopup } from './index.js';

export default class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.photo-grid__element')
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardTitle = this._element.querySelector('.photo-grid__title');
    const cardImage = this._element.querySelector('.photo-grid__image');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector('.photo-grid__like-btn');
    const delBtn = this._element.querySelector('.photo-grid__del-btn');
    const cardImage = this._element.querySelector('.photo-grid__image');

    likeBtn.addEventListener('click', () => {
      this._handleLikeClick(likeBtn);
    });

    delBtn.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    cardImage.addEventListener('click', () => {
      this._handleViewPhoto();
    });
  }

  _handleLikeClick(likeButton) {
    likeButton.classList.toggle('like-btn_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleViewPhoto() {
    const photoView = document.querySelector('#view-popup');
    const photoViewImage = photoView.querySelector('.popup__image');
    const photoViewCaption = photoView.querySelector('.popup__caption');

    showPopup(photoView);
    photoViewImage.src = this._link;
    photoViewCaption.textContent = this._name;
    photoViewImage.alt = this._name;
  }
}
