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