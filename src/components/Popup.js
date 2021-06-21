export class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this.popupElement = document.querySelector(popupSelector);
	}

	open() {
		this.popupElement.classList.add('popup_opened');

		document.addEventListener('keydown', (evt) => {
			this._handleEscClose(evt);
		});


	}

	close() {
		this.popupElement.classList.remove('popup_opened');

		document.removeEventListener('keydown', (evt) => {
			this._handleEscClose(evt);
		});
	}

	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	setEventListeners() {
		const closeBtn = this.popupElement.querySelector('.popup__close-btn');
		closeBtn.addEventListener('click', () => {
			this.close();
		});

		this.popupElement.addEventListener('mousedown', (evt) => {
			if (evt.target.id === this._popupSelector.substring(1)) {
				this.close();
			}
		});
	}
}
