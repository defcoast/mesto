export default class Card {
  constructor(
      data,
      userId,
      cardTemplateSelector,
      handleCardClick,
      handleDeleteClick,
      likeCardCb,
      unlikeCardCb,
      likeCount,

  )

  {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likesCount = likeCount;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._handleLike = likeCardCb;
    this._handleUnlike = unlikeCardCb;





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
    this._likesCountElement = this._element.querySelector('.photo-grid__like-count');
    this._likeBtn = this._element.querySelector('.photo-grid__like-btn');

    this._delBtn = this._element.querySelector('.photo-grid__del-btn');

    if (this._userId !== this._data.owner._id){
      this._delBtn.remove()
    }

    if (this._data.likes.find(item => item._id === this._userId)) {
      this._toggleLikeBtn(this._likeBtn);

    }

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._likesCountElement.textContent = this._likesCount;


    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {

    const cardImage = this._element.querySelector('.photo-grid__image');

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick(this._likeBtn);
    });

    this._delBtn.addEventListener('click', () => {
      console.log('click')
      this._handleDeleteClick(this._data);
    });

    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _handleLikeClick(likeButton) {
    this._toggleLikeBtn(likeButton)

    if (this._likeBtn.classList.contains('like-btn_active')) {
      // console.log('+1');
      // console.log(this._data.likes)
      this._handleLike(this._data);
      this._likesCountElement.textContent = this._likesCount + 1;
      // console.log(this._likesCount)
    }
    else {
      // console.log(this._likesCount, '-1 лайка этой карточке');
      this._handleUnlike(this._data);
      let currentLikeCount = this._likesCount - 1;
      if (currentLikeCount < 0) {
        this._likesCountElement.textContent = 0;
      }
      else {
        this._likesCountElement.textContent = currentLikeCount;
      }
    }

  }

  _toggleLikeBtn(likeButton) {
    likeButton.classList.toggle('like-btn_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;

  }
}
