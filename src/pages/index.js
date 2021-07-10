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
const btnEditAvatar = profile.querySelector('.profile__edit-avatar-btn');

// Подключение к  меню редактирования профиля
const popupProfile = document.querySelector('#edit-popup');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const inputNamePopupProfile = formPopupProfile.querySelector('#username');
const inputBioPopupProfile = formPopupProfile.querySelector('#userbio');

// Подключение к меню создания новой карточки
const popupCard = document.querySelector('#add-popup');
const formPopupCard = popupCard.querySelector('.popup__form');

// Подключение к меню создания смены аватара
const popupUpdateAvatar = document.querySelector('#update-avatar-popup');
const formUpdateAvatar = popupUpdateAvatar.querySelector('.popup__form');

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

Promise.all([
    api.getUserInfo(),
    api.getInitialCards(),
])
.then(([userData, cardData]) => {

    let myUserId = null;
    myUserId = userData._id;

    //Получаем данные профиля от сервера
    profileUserName.textContent = userData.name;
    profileUserBio.textContent = userData.about;
    profileAvatar.src = userData.avatar;


    // Отрисовка секции с карточками
    const cardSection = new Section(
        {

            // Откуда брать данные для карточек
            items: cardData,

            // Настройки рендеринга карточек
            renderer: (cardData) => {

                // Создание экземпляра карточки
                const card = new Card(cardData, myUserId,  '#photo-grid-template',

                    () => {
                        // Обработчик клика по карточке
                        popupViewImage.open(cardData);
                    },


                    (cardData) => {



                        const popupConfirm = new PopupWithForm('#confirm-popup', (confirmData) => {
                            if (confirmData) {
                                popupConfirm.close();
                                console.log('1');
                                api.deleteCard(cardData)
                                .then((res) => {
                                    if (res.ok) {
                                        card.deleteCard();
                                    }
                                })
                            }
                        });
                        popupConfirm.open(cardData);

                    },

                    (cardData) => {
                        // carData.likes.length + 1;
                        api.likeCard(cardData).then(res => res.json()).then((data) => {
                            console.log(data)
                        })
                    },

                    (cardData) => {
                        // console.log('test')
                        api.unlikeCard(cardData).then(res => res.json()).then((data) => {
                            console.log(data)
                        })
                    },

                    cardData.likes.length
                );

                // Генерация и отрисовка карточек
                const newCard = card.generateCard();
                cardSection.element.append(newCard);
            },
        },

        // В какой блок отрисовывать карточки
        '.photo-grid__elements'
    );

    cardSection.renderAll();

    // Попап создания новой карточки
    const popupAddCard = new PopupWithForm('#add-popup', (cardData) => {
        popupAddCard.submitBtn.textContent = 'Сохранение...';
        // cardSection.addItem(cardData);
        api.addCard(cardData)
        .then((res) => {
            if (res.ok) {
                popupAddCard.submitBtn.textContent = 'Сохранение...';
                return res.json();
            }
        })
        .then((updateCardData) => {
            cardSection.addItem(updateCardData)

        })
        .catch((err) => {
            console.log('Ошибка сервера: ', err)
        })
        .finally(() => {
            popupAddCard.close();
        });
        console.log(cardData)
    });

    // Попап редактирования профиля
    const popupEditProfile = new PopupWithForm('#edit-popup', (profileData) => {
        // Отправляем данные на сервер и изменяем данные профиля в шапке сайта
        api.setUserInfo(profileData)
        .then((res) => {
            if (res.ok) {
                userInfo.setUserInfo(profileData);
                popupEditProfile.submitBtn.textContent = 'Сохранение...';
            }
        })
        .catch((err) => {
            console.log('Ошибка сервера: ', err)
        })
        .finally(() => {
            popupEditProfile.close();
        })
    });

    // Попап просмотра изображений
    const popupViewImage = new PopupWithImage('#view-popup');
    popupViewImage.setEventListeners();

    const popupUpdateAvatar = new PopupWithForm('#update-avatar-popup', (linkAvatar) => {
        api.updateAvatar(linkAvatar)
        .then((res) => {
            if (res.ok) {
                popupUpdateAvatar.submitBtn.textContent = 'Сохранение...';
                profileAvatar.src = linkAvatar.link;
            }
        })
        .catch((err) => {
            console.log('Ошибка сервера: ', err);
        })
        .finally(() => {
            popupUpdateAvatar.close();
        });
    });


    // Создаем экземпляр класса и передаем селекторы элементов
    const userInfo = new UserInfo({
        userNameElement: '.profile__username',
        userBioElement: '.profile__userbio',
    });

    // ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
    // Валидация формы создания карточки
    const formCardElement = new FormValidator(config, formPopupCard);
    formCardElement.enableValidation();

    // Валидация формы редактирования профиля
    const formProfileElement = new FormValidator(config, formPopupProfile);
    formProfileElement.enableValidation();

    // Валидация формы смены аватара
    const formUpdateAvatarElement = new FormValidator(config, formUpdateAvatar);
    formUpdateAvatarElement.enableValidation();

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

    // Кнопка редактировать аватар
    btnEditAvatar.addEventListener('click', () => {
        popupUpdateAvatar.open();
    })

})
.catch((err) => {
    alert(err);
})
