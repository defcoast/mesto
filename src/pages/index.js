import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {Api} from "../components/Api";

//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// ---------------------------------------------------------------------

// Подключение к блоку PROFILE
const profile = document.querySelector('.profile');
const addBtn = profile.querySelector('.profile__add-btn');
const editBtn = profile.querySelector('.profile__edit-btn');
const profileUserName = profile.querySelector('.profile__username');
const profileUserBio = profile.querySelector('.profile__userbio');
const profileAvatar = profile.querySelector('.profile__avatar');

// Подключение к  меню редактирования профиля
const popupProfile = document.querySelector('#edit-popup');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const inputNamePopupProfile = formPopupProfile.querySelector('#username');
const inputBioPopupProfile = formPopupProfile.querySelector('#userbio');

// Подключение к меню создания новой карточки
const popupCard = document.querySelector('#add-popup');
const formPopupCard = popupCard.querySelector('.popup__form');

// Подключение к карточке

// Конфигурация для валидатора
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//Настройки API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '786b7eb6-0454-4c7c-be53-f59c275d8c34',
    'Content-Type': 'application/json'
  }
});

// Принимаем карточки от сервера
api.getInitialCards()
    .then(serverCardData => {

      // Отрисовка секции с карточками
      const cardSection = new Section(
        {

          // Откуда брать данные для карточек
          items: serverCardData,

          // Настройки рендеринга карточек
          renderer: (cardData) => {

            // Создание экземпляра карточки
            const card = new Card(cardData, '#photo-grid-template', () => {

            // Обработчик клика по карточке
              popupViewImage.open(cardData);
            }, cardData.likes.length);

            // Генерация и отрисовка карточек
            const newCard = card.generateCard();
            cardSection.element.prepend(newCard);
          },
        },

        // В какой блок отрисовывать карточки
        '.photo-grid__elements'
      );

      cardSection.renderAll();

      // Попап создания новой карточки
      const popupAddCard = new PopupWithForm('#add-popup', (cardData) => {
        cardSection.addItem(cardData);
        api.addCard(cardData);
        popupAddCard.close();
      });

      // Попап редактирования профиля
      const popupEditProfile = new PopupWithForm('#edit-popup', (profileData) => {
          // Отправляем данные на сервер и изменяем данные профиля в шапке сайта
          userInfo.setUserInfo(profileData);
          api.setUserInfo(profileData)
          popupEditProfile.close();
      });

      // Попап просмиотра изображений
      const popupViewImage = new PopupWithImage('#view-popup');
      popupViewImage.setEventListeners();

      // Блок профиля
        //Получаем данные профиля от сервера
        api.getUserInfo()
            .then(userData => {
                profileUserName.textContent = userData.name;
                profileUserBio.textContent = userData.about;
                profileAvatar.src = userData.avatar;
            });

      // Создаем экземпляр класса и передаем селекторы элементов
      const userInfo = new UserInfo({
        userNameElement: '.profile__username',
        userBioElement: '.profile__userbio',
      });

      // Включение валидации
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


    });