import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/initial-сards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// ---------------------------------------------------------------------

// Подключение к блоку PROFILE
const profile = document.querySelector('.profile');
const addBtn = profile.querySelector('.profile__add-btn');
const editBtn = profile.querySelector('.profile__edit-btn');

// Подключение к  меню редактирования профиля
const editProfileMenu = document.querySelector('#edit-popup');
const editProfileForm = editProfileMenu.querySelector('.popup__form');
const editProfileUserNameInput = editProfileForm.querySelector('#username');
const editProfileUserBioInput = editProfileForm.querySelector('#userbio');

// Подключение к меню создания новой карточки
const createPlaceMenu = document.querySelector('#add-popup');
const createForm = createPlaceMenu.querySelector('.popup__form');

// Конфигурация для валидатора
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, '#photo-grid-template', () => {
        imagePopup.open(cardData);
      });
      return card.generateCard();
    },
  },
  '.photo-grid__elements'
);

const addCardPopup = new PopupWithForm('#add-popup', (cardData) => {
  cardSection.addItem(cardData);
  addCardPopup.close();
});

const editProfilePopup = new PopupWithForm('#edit-popup', (profileData) => {
  userInfo.setUserInfo(profileData);
  editProfilePopup.close();
});

const imagePopup = new PopupWithImage('#view-popup');
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userNameElement: '.profile__username',
  userBioElement: '.profile__userbio',
});

const createFormEl = new FormValidator(config, createForm);
createFormEl.enableValidation();
const editFormEl = new FormValidator(config, editProfileForm);
editFormEl.enableValidation();

// ОБРАБОТЧИКИ СОБЫТИЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  addCardPopup.open();
  createFormEl.checkButtonState();
  createFormEl.clearInputsErrors();
});

// Кнопка редактировать профиль
editBtn.addEventListener('click', function () {
  editProfilePopup.open();

  const userProfileData = userInfo.getUserInfo();
  editProfileUserNameInput.value = userProfileData.userName;
  editProfileUserBioInput.value = userProfileData.userBio;

  editFormEl.checkButtonState();
  editFormEl.clearInputsErrors();
});
