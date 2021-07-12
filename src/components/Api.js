export class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserInfo(profileData) {
         return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.username,
                about: profileData.userbio,
            }),
        })
            .then(this._checkResponse)
    }

    addCard(cardData){
         return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        })
         .then(this._checkResponse)
    }

    deleteCard(cardData){
        return  fetch(`${this._url}/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    likeCard(cardData){
        return fetch(`${this._url}/cards/likes/${cardData._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    unlikeCard(cardData){
        return fetch(`${this._url}/cards/likes/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    updateAvatar(linkAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: linkAvatar.link,
            }),
        })
        .then(this._checkResponse)
    }


}