import { likePost, delCard } from './index.js';

export default class Card {
  _text;
  _image;

  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardTemplate)
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

    this._setEventListener();

    return this._element;
  }

  _setEventListener() {
    const likeBtn = this._element.querySelector('.photo-grid__like-btn');
    const delBtn = this._element.querySelector('.photo-grid__del-btn');
    const cardImage = this._element.querySelector('.photo-grid__image');

    likeBtn.addEventListener('click', likePost);
    delBtn.addEventListener('click', delCard);
    cardImage.addEventListener('click', () => {
      viewPhoto(this._link, this._name);
    });
  }
}
