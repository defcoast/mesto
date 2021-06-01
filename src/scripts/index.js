import Card from './Card.js';
import FormValidator from './FormValidator.js';

export { likePost, delCard, showInputError, hideInputError, hazInvalidInput };
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
const editProfileSaveBtn = editProfileMenu.querySelector('.popup__save-btn');
// Подключение к меню создания новой карточки
const createPlaceMenu = document.querySelector('#add-popup');
const createForm = createPlaceMenu.querySelector('.popup__form');
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

//Массив со стартовыми фотографиями
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ
// ---------------------------------------------------------------------

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
    photoGridList.append(item);
  });
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

  const card = new Card(
    { name: createMenuNameInput.value, link: createMenuLinkInput.value },
    '#photo-grid-template'
  );
  const cardElement = card.generateCard();
  photoGridList.prepend(cardElement);
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
    });
  });
}

// ВЫЗОВ ФУНКЦИЙ
// ---------------------------------------------------------------------

// createCard();
// pushStartingCards();
closeByOverlay();

//ОБЪЯВЛЕНИЕ СЛУШАТЕЛЕЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  showPopup(createPlaceMenu);
  createForm.reset();
  createCardBtn.disabled = true;
  hideInputError(createForm, createMenuNameInput);
  hideInputError(createForm, createMenuLinkInput);
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
  editProfileSaveBtn.disabled = false;
  hideInputError(editProfileForm, editProfileUserNameInput);
  hideInputError(editProfileForm, editProfileUserBioInput);
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

initialCards.forEach((item) => {
  const card = new Card(item, '#photo-grid-template');
  const cardElement = card.generateCard();
  photoGridList.append(cardElement);
});

const showInputError = (form, input) => {
  // Подключаем span для вывода ошибки
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = input.validationMessage;

  input.classList.add(config.inputErrorClass);
  errorSpan.classList.add(config.errorClass);
};

const hideInputError = (form, input) => {
  const errorSpan = form.querySelector(`#${input.id}-error`);

  errorSpan.textContent = '';

  input.classList.remove(config.inputErrorClass);
  errorSpan.classList.remove(config.errorClass);
};

const hazInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

function startValidation() {
  const editProfileMenu = document.querySelector('#edit-popup');
  const editProfileForm = editProfileMenu.querySelector('.popup__form');
  const editForm = new FormValidator(config, editProfileForm);
  editForm.enableValidation();

  const createPlaceMenu = document.querySelector('#add-popup');
  const createForm = createPlaceMenu.querySelector('.popup__form');
  const createFormEl = new FormValidator(config, createForm);
  createFormEl.enableValidation();
}

startValidation();
