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
const popupProfile = document.querySelector('#edit-popup');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const inputNamePopupProfile = formPopupProfile.querySelector('#username');
const inputBioPopupProfile = formPopupProfile.querySelector('#userbio');

// Подключение к меню создания новой карточки
const popupCard = document.querySelector('#add-popup');
const formPopupCard = popupCard.querySelector('.popup__form');

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
        popupViewImage.open(cardData);
      });

      const newCard = card.generateCard();
      cardSection.element.prepend(newCard);
    },
  },
  '.photo-grid__elements'
);

cardSection.renderAll();

const popupAddCard = new PopupWithForm('#add-popup', (cardData) => {
  cardSection.addItem(cardData);
  popupAddCard.close();
});

const popupEditProfile = new PopupWithForm('#edit-popup', (profileData) => {
  userInfo.setUserInfo(profileData);
  popupEditProfile.close();
});

const popupViewImage = new PopupWithImage('#view-popup');
popupViewImage.setEventListeners();

const userInfo = new UserInfo({
  userNameElement: '.profile__username',
  userBioElement: '.profile__userbio',
});

const formCardElement = new FormValidator(config, formPopupCard);
formCardElement.enableValidation();
const formProfileElement = new FormValidator(config, formPopupProfile);
formProfileElement.enableValidation();

// ОБРАБОТЧИКИ СОБЫТИЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  popupAddCard.open();
  formCardElement.checkButtonState();
  formCardElement.clearInputsErrors();
});

// Кнопка редактировать профиль
editBtn.addEventListener('click', function () {
  popupEditProfile.open();

  const userProfileData = userInfo.getUserInfo();
  inputNamePopupProfile.value = userProfileData.userName;
  inputBioPopupProfile.value = userProfileData.userBio;

  formProfileElement.checkButtonState();
  formProfileElement.clearInputsErrors();
});
