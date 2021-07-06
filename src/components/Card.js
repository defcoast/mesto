export default class Card {
  constructor(data, userId, cardTemplateSelector, handleCardClick, likeCount, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likesCount = likeCount;
    this._handleOpenPopup = handleOpenPopup;
    this._userId = userId;


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

    this._delBtn = this._element.querySelector('.photo-grid__del-btn');

    if (this._userId !== this._data.owner._id){
      this._delBtn.remove()
    }

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    likesCount.textContent = this._likesCount;


    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector('.photo-grid__like-btn');
    const cardImage = this._element.querySelector('.photo-grid__image');

    likeBtn.addEventListener('click', () => {
      this._handleLikeClick(likeBtn);
    });

    this._delBtn.addEventListener('click', () => {
      this._handleOpenPopup(this._data);
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
