const popup = document.querySelector('.popup');
const addPopup = document.querySelector('#add-popup');
const closeButton = popup.querySelector('.popup__close-btn');
const closeAddPopupButton = addPopup.querySelector('#close-add-popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('[name="username"]');
const jobInput = formElement.querySelector('[name="userbio"]');

const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');
const userName = profile.querySelector('.profile__username');
const userBio = profile.querySelector('.profile__userbio');

const newPlaceForm = document.querySelector('#new-place');

const photoGridTemplate = document.querySelector('#photo-grid-template').content;
const gridTemplateElements = document.querySelector('.photo-grid__elements');

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



function openAndClosePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
}

function openAndCloseAddPopup() {
  addPopup.classList.toggle('popup_opened');

}

function formSubmitHandler (evt) {
    evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue =  jobInput.value;

  userName.textContent = nameInputValue;
  userBio.textContent = jobInputValue;

  openAndClosePopup();
}

function addPlaceSubmitHandler (evt) {
  evt.preventDefault();
  
  const newPlaceForm = document.querySelector('#new-place');
  const nameInput = newPlaceForm.querySelector('[name="name"]');
  const linkInput = newPlaceForm.querySelector('[name="link"]');

  const nameInputValue = nameInput.value;
  const linkInputValue =  linkInput.value;

  openAndCloseAddPopup();

  const photoGridCard = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
  const gridTemplateImg = photoGridCard.querySelector('.photo-grid__image');
  const gridTemplateTitle = photoGridCard.querySelector('.photo-grid__title');

  const delBtn = photoGridCard.querySelector('.del-btn');

  gridTemplateImg.src = linkInputValue;
  gridTemplateTitle.textContent = nameInputValue;
  
  gridTemplateElements.prepend(photoGridCard);

  photoGridCard.querySelector('.like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-btn_active');
  });

  delBtn.addEventListener('click', function (evt) {
    evt.target.closest('.photo-grid__element').remove();
  });
  
}

function addStartingCards() {

  for (let i = 0; i < 6; i++) {
  const photoGridCard = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
  const gridTemplateImg = photoGridCard.querySelector('.photo-grid__image');
  const gridTemplateTitle = photoGridCard.querySelector('.photo-grid__title');
  
  const currentItem = initialCards[i];
    
  const delBtn = photoGridCard.querySelector('.del-btn');

  gridTemplateImg.src = currentItem.link;
  gridTemplateTitle.textContent = currentItem.name

  gridTemplateElements.append(photoGridCard);
  
  photoGridCard.querySelector('.like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-btn_active');
  });
    
  delBtn.addEventListener('click', function (evt) {
    evt.target.closest('.photo-grid__element').remove();
  });

  }

}


addStartingCards();

editButton.addEventListener('click', openAndClosePopup);
closeButton.addEventListener('click', openAndClosePopup);
formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', openAndCloseAddPopup);
closeAddPopupButton.addEventListener('click', openAndCloseAddPopup);
newPlaceForm.addEventListener('submit', addPlaceSubmitHandler);

