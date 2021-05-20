//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// ---------------------------------------------------------------------

// Подключение к оверлэю
const overlay = Array.from(document.querySelectorAll('.popup'));

// Подключение к блоку PROFILE
const profile = document.querySelector('.profile');
const addBtn = profile.querySelector('.profile__add-btn');
const editBtn = profile.querySelector('.profile__edit-btn');
const profileUserName = profile.querySelector('.profile__username');
const profileUserBio = profile.querySelector('.profile__userbio');

// Подключение к  меню редактирования профиля
const editProfileMenu = document.querySelector('#edit-popup');
const closeProfileMenuBtn = editProfileMenu.querySelector('.popup__close-btn');
const editProfileForm = editProfileMenu.querySelector('.popup__form');
const editProfileUserNameInput = editProfileForm.querySelector('#username');
const editProfileUserBioInput = editProfileForm.querySelector('#userbio');

// Подключение к меню создания новой карточки
const createPlaceMenu = document.querySelector('#add-popup');
const createForm = createPlaceMenu.querySelector('.popup__form')
const createCardBtn = createPlaceMenu.querySelector('.popup__save-btn');
const closeCreateCardBtn = createPlaceMenu.querySelector('.popup__close-btn');
const createMenuNameInput = createPlaceMenu.querySelector('#name');
const createMenuLinkInput = createPlaceMenu.querySelector('#link');

// Подключение к меню просмотра фото
const photoView = document.querySelector('#view-popup');
const photoViewImage = photoView.querySelector('.popup__image');
const closePhotoViewBtn = photoView.querySelector('.popup__close-btn');
const photoViewCaption = photoView.querySelector('.popup__caption');

//Подключение к блоку с карточками
const photoGridList = document.querySelector('.photo-grid__elements');

// Подключение к темплейту карточки
const photoGridTemplate = document.querySelector('#photo-grid-template').content;


// ОБЪЯВЛЕНИЕ ФУНКЦИЙ
// ---------------------------------------------------------------------

function createCard(name, link) {
  const card = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
  const cardTitle = card.querySelector('.photo-grid__title');
  const cardLink = card.querySelector('.photo-grid__image');
  const likeBtn = card.querySelector('.photo-grid__like-btn');
  const delBtn = card.querySelector('.photo-grid__del-btn');
  const cardImage = card.querySelector('.photo-grid__image');

  cardTitle.textContent = name;
  cardLink.src = link;
  cardImage.alt = name;
  // Лайк 

  likeBtn.addEventListener('click', likePost);

  // Удаление карточки
  delBtn.addEventListener('click', delCard)

  // Просмотр фото
  cardImage.addEventListener('click', function () {
    viewPhoto(cardImage.src, cardImage.alt);
  })

  return card;
}

function likePost(evt) {
 evt.target.classList.toggle('like-btn_active');
}

function delCard(evt) {
  evt.target.closest('.photo-grid__element').remove();
}

function viewPhoto(cardImageSrc, cardImageAlt) {
  showPopup(photoView);
  photoViewImage.src = cardImageSrc;
  photoViewCaption.textContent = cardImageAlt;
  photoViewImage.alt = cardImageAlt;
}


function pushStartingCards() {
  const startingCards = [];

    initialCards.forEach(function (item) {
      startingCards.push(createCard(item.name, item.link));
    });
    
    startingCards.forEach(function (item) {
       photoGridList.append(item)
    })
}


function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);

}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}


function createCardHandler(evt) {
  evt.preventDefault();

  hidePopup(createPlaceMenu);
  checkButtonState(createCardBtn, )
  photoGridList.prepend(createCard(createMenuNameInput.value, createMenuLinkInput.value));

}

function editProfileHandler(evt) {
  evt.preventDefault();

  hidePopup(editProfileMenu);

  profileUserName.textContent = editProfileUserNameInput.value;
  profileUserBio.textContent = editProfileUserBioInput.value;
}

function closeByEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');  
  if (evt.key === 'Escape') {
    hidePopup(openedPopup);
  }
}

function closeByOverlay() {
  overlay.forEach((overlayElement) => {
    overlayElement.addEventListener('mousedown', (evt) => {
      hidePopup(evt.target); 
    })
  })
}




// ВЫЗОВ ФУНКЦИЙ
// ---------------------------------------------------------------------

createCard();
pushStartingCards();
closeByOverlay();



//ОБЪЯВЛЕНИЕ СЛУШАТЕЛЕЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  showPopup(createPlaceMenu);
  createForm.reset();
  createCardBtn.disabled = true;
  hideInputError(createForm, createMenuNameInput, config);
  hideInputError(createForm, createMenuLinkInput, config);
    
});

// Кнопка закрыть меню добавления карточки
closeCreateCardBtn.addEventListener('click', function () {
  hidePopup(createPlaceMenu);
});

// Кнопка создать новую карточку
createForm.addEventListener('submit', createCardHandler);


// Кнопка редактировать профиль
editBtn.addEventListener('click', function () {
  showPopup(editProfileMenu);
  editProfileUserNameInput.value = profileUserName.textContent;
  editProfileUserBioInput.value = profileUserBio.textContent;
  hideInputError(editProfileForm, editProfileUserNameInput, config);
  hideInputError(editProfileForm, editProfileUserBioInput, config);
});

// Кнопка закрыть меню редактирования профиля
closeProfileMenuBtn.addEventListener('click', function () {
  hidePopup(editProfileMenu);
});

// Кнопка сохранить изменения в профиле
editProfileForm.addEventListener('submit', editProfileHandler);

// Кнопка закрыть изображение
closePhotoViewBtn.addEventListener('click', function () {
  hidePopup(photoView);
});

// document.addEventListener('keydown', closeByEsc);

