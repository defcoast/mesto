export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, likeCount) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likesCount = likeCount;
  }

  _getTemplate() {
    return  document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.photo-grid__element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardTitle = this._element.querySelector('.photo-grid__title');
    const cardImage = this._element.querySelector('.photo-grid__image');
    const likesCount = this._element.querySelector('.photo-grid__like-count');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    likesCount.textContent = this._likesCount;


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
      this._handleCardClick(this._data);
    });
  }

  _handleLikeClick(likeButton) {
    likeButton.classList.toggle('like-btn_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
}
