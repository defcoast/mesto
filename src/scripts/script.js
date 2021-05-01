const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('[name="username"]');
const jobInput = formElement.querySelector('[name="userbio"]');

const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');
const userName = profile.querySelector('.profile__username');
const userBio = profile.querySelector('.profile__userbio');

function openAndClosePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue =  jobInput.value;

  userName.textContent = nameInputValue;
  userBio.textContent = jobInputValue;

  openAndClosePopup();
}

editButton.addEventListener('click', openAndClosePopup);
closeButton.addEventListener('click', openAndClosePopup);
formElement.addEventListener('submit', formSubmitHandler);


//ДИНАМИЧЕСКИЕ КАРТОЧКИ
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const photoGridTemplate = document.querySelector('#photo-grid-template').content;
const gridTemplateElements = document.querySelector('.photo-grid__elements');

for (let i = 0; i < 6; i++) {
  const photoGridCard = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
  const gridTemplateImg = photoGridCard.querySelector('.photo-grid__image');
  const gridTemplateTitle = photoGridCard.querySelector('.photo-grid__title');

  gridTemplateImg.src = initialCards[i].link;
  gridTemplateTitle.textContent = initialCards[i].name

  gridTemplateElements.append(photoGridCard);
  
}
