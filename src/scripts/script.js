//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// ---------------------------------------------------------------------

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

  cardTitle.textContent, cardImage.alt = name;
  cardLink.src = link;

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
  openCloseTurn(photoView);
  photoViewImage.src = cardImageSrc;
  photoViewCaption.textContent, photoViewImage.alt = cardImageAlt;
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


function openCloseTurn(popupName) {
  popupName.classList.toggle('popup_opened');
}


// ФУНКЦИИ-ОБРАБОТЧИКИ СОБЫТИЙ

function createCardHandler(evt) {
  evt.preventDefault();

  createPlaceMenu.classList.toggle('popup_opened');

  photoGridList.prepend(createCard(createMenuNameInput.value, createMenuLinkInput.value));

}

function editProfileHandler(evt) {
  evt.preventDefault();

  openCloseTurn(editProfileMenu);

  profileUserName.textContent = editProfileUserNameInput.value;
  profileUserBio.textContent = editProfileUserBioInput.value;
}



// ВЫЗОВ ФУНКЦИЙ
// ---------------------------------------------------------------------

createCard();
pushStartingCards();



//ОБЪЯВЛЕНИЕ СЛУШАТЕЛЕЙ
// ---------------------------------------------------------------------

// Кнопка Добавить карточку
addBtn.addEventListener('click', function () {
  openCloseTurn(createPlaceMenu);
  createForm.reset();

});

// Кнопка закрыть меню добавления карточки
closeCreateCardBtn.addEventListener('click', function () {
  openCloseTurn(createPlaceMenu);
});

// Кнопка создать новую карточку
createForm.addEventListener('submit', createCardHandler);


// Кнопка редактировать профиль
editBtn.addEventListener('click', function () {
  openCloseTurn(editProfileMenu);
  editProfileUserNameInput.value = profileUserName.textContent;
  editProfileUserBioInput.value = profileUserBio.textContent;
});

// Кнопка закрыть меню редактирования профиля
closeProfileMenuBtn.addEventListener('click', function () {
  openCloseTurn(editProfileMenu);
});

// Кнопка сохранить изменения в профиле
editProfileForm.addEventListener('submit', editProfileHandler);

// Кнопка закрыть изображение
closePhotoViewBtn.addEventListener('click', function () {
    photoView.classList.toggle('popup_opened');
  })
