// Подключение к блоку PROFILE
const profile = document.querySelector('.profile');
const addBtn = profile.querySelector('.profile__add-btn');
const editBtn = profile.querySelector('.profile__edit-btn');
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

export {
	profile,
	addBtn,
	editBtn,
	profileAvatar,
	btnEditAvatar,
	popupProfile,
	formPopupProfile,
	inputNamePopupProfile,
	inputBioPopupProfile,
	popupCard,
	formPopupCard,
	popupUpdateAvatar,
	formUpdateAvatar,
	config,
}