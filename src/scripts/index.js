import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-сards.js';

export { showPopup };

//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// ---------------------------------------------------------------------

// Подключение к оверлэю
const overlays = Array.from(document.querySelectorAll('.popup'));

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
const createForm = createPlaceMenu.querySelector('.popup__form');
const closeCreateCardBtn = createPlaceMenu.querySelector('.popup__close-btn');
const createMenuNameInput = createPlaceMenu.querySelector('#name');
const createMenuLinkInput = createPlaceMenu.querySelector('#link');

// Подключение к меню просмотра фото
const photoView = document.querySelector('#view-popup');
// const photoViewImage = photoView.querySelector('.popup__image');
const closePhotoViewBtn = photoView.querySelector('.popup__close-btn');
// const photoViewCaption = photoView.querySelector('.popup__caption');

//Подключение к блоку с карточками
const photoGridList = document.querySelector('.photo-grid__elements');

// Конфигурация для валидатора
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ
// ---------------------------------------------------------------------

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    hidePopup(openedPopup);
  }
}

function closeByOverlay() {
  overlays.forEach((overlayElement) => {
    overlayElement.addEventListener('mousedown', (evt) => {
      hidePopup(evt.target);
    });
  });
}

function renderCard(item, cardTemplateSelector) {
  const card = new Card(item, cardTemplateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

// ВЫЗОВ ФУНКЦИЙ
// ---------------------------------------------------------------------

initialCards.forEach((item) => {
  photoGridList.append(renderCard(item, '#photo-grid-template'));
});

const createFormEl = new FormValidator(config, createForm);
createFormEl.enableValidation();
const editFormEl = new FormValidator(config, editProfileForm);
editFormEl.enableValidation();

closeByOverlay();

// ОБРАБОТЧИКИ СОБЫТИЙ
// ---------------------------------------------------------------------

function createCardHandler(evt) {
  evt.preventDefault();

  hidePopup(createPlaceMenu);

  photoGridList.prepend(
    renderCard(
      { name: createMenuNameInput.value, link: createMenuLinkInput.value },
      '#photo-grid-template'
    )
  );
}

function editProfileHandler(evt) {
  evt.preventDefault();

  hidePopup(editProfileMenu);

  profileUserName.textContent = editProfileUserNameInput.value;
  profileUserBio.textContent = editProfileUserBioInput.value;
}

//ОБЪЯВЛЕНИЕ СЛУШАТЕЛЕЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  showPopup(createPlaceMenu);
  createForm.reset();
  createFormEl.checkButtonState();
  createFormEl.clearInputsErrors();
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
  editFormEl.checkButtonState();
  editFormEl.clearInputsErrors();
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
