import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from "../components/Api.js";

import {
	addBtn,
	btnEditAvatar,
	config,
	editBtn,
	formPopupCard,
	formPopupProfile,
	formUpdateAvatar,
	inputBioPopupProfile,
	inputNamePopupProfile,
} from '../utils/constants.js'


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

	// Создаем экземпляр класса и передаем селекторы элементов
	const userInfo = new UserInfo({
		userNameElement: '.profile__username',
		userBioElement: '.profile__userbio',
		userAvatarElement: '.profile__avatar',
	});

	// Отрисовка пользовательских данных
	userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);

	// Отрисовка секции с карточками
	const cardSection = new Section(
		{

			// Откуда брать данные для карточек
			items: cardData,

			// Настройки рендеринга карточек
			renderer: (cardData) => {

				const card = createCard(cardData);

				// Отрисовка карточек
				cardSection.appendItem(card);
			},
		},

		// В какой блок отрисовывать карточки
		'.photo-grid__elements'
	);

	cardSection.renderAll();

	// Попап создания новой карточки
	const popupAddCard = new PopupWithForm('#add-popup', (cardData) => {
		popupAddCard.submitBtn.textContent = 'Сохранение...';

		api.addCard(cardData)
		.then((updateCardData) => {
			const card = createCard(updateCardData)
			cardSection.prependItem(card);

			popupAddCard.close();

		})
		.catch((err) => {
			console.log('Ошибка сервера: ', err)
		})
		.finally(() => {
			popupAddCard.submitBtn.textContent = 'Создать';
		});
	});

	// Попап редактирования профиля
	const popupEditProfile = new PopupWithForm('#edit-popup', (profileData) => {
		// Отправляем данные на сервер и изменяем данные профиля в шапке сайта
		popupEditProfile.submitBtn.textContent = 'Сохранение...';

		api.setUserInfo(profileData)
		.then(() => {
			console.log(profileData)
				userInfo.setUserInfo(profileData.username, profileData.userbio );
				popupEditProfile.close();
		})
		.catch((err) => {
			console.log('Ошибка сервера: ', err)
		})
		.finally(() => {
			popupEditProfile.submitBtn.textContent = 'Сохранить';
		})
	});

	// Попап просмотра изображений
	const popupViewImage = new PopupWithImage('#view-popup');
	popupViewImage.setEventListeners();

	// Попап смены аватара
	const popupUpdateAvatar = new PopupWithForm('#update-avatar-popup', (linkAvatar) => {
		popupUpdateAvatar.submitBtn.textContent = 'Сохранение...';

		api.updateAvatar(linkAvatar)
		.then(() => {
			userInfo.setAvatar(linkAvatar.link)
			popupUpdateAvatar.close();
		})
		.catch((err) => {
			console.log('Ошибка сервера: ', err);
		})

		.finally(() => {
			popupUpdateAvatar.submitBtn.textContent = 'Сохранить';
		});
	});

	// Попап подтверждения удаления карточки
	const popupConfirm = new PopupWithForm('#confirm-popup', (confirmData) => {
		if (confirmData) {
			api.deleteCard(popupConfirm.data)
			.then(() => {
					popupConfirm.card.deleteCard();
					popupConfirm.close();
			})
			.catch((err) => {
				console.log(err);
			});

		}
	},);

	function createCard (cardData) {
		const card = new Card(cardData, myUserId, '#photo-grid-template',

			() => {
				// Обработчик клика по карточке
				popupViewImage.open(cardData);
			},


			(cardData) => {

				popupConfirm.open();
				popupConfirm.setData(cardData, card);

			},

			(cardData) => {
				api.likeCard(cardData)
				.then((res) => {
					card.likesCountElement.textContent = res.likes.length;
				})
				.catch((err) => {
					console.log(err)
				})
			},

			(cardData) => {
				api.unlikeCard(cardData)
				.then((res) => {
					console.log(res.likes.length)
					card.likesCountElement.textContent = res.likes.length;

				})
				.catch((err) => {
					console.log(err)
				})
			},

			cardData.likes.length
		);

		//Генерируем и возвращаем HTML-элемент
		return card.generateCard();
	}

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




