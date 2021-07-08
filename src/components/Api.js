export class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => res.json())
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => res.json())
    }

    setUserInfo(profileData) {
         fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.username,
                about: profileData.userbio,
            }),
        });
    }

    addCard(cardData){
         fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        });
    }

    deleteCard(cardData){
        fetch(`${this._url}/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    likeCard(cardData){
        return fetch(`${this._url}/cards/likes/${cardData._id}`, {
            method: 'PUT',
            headers: this._headers,
        });
    }

    unlikeCard(cardData){
        return fetch(`${this._url}/cards/likes/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    updateAvatar(linkAvatar) {
        console.log(linkAvatar)
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: linkAvatar.link,
            }),
        })
    }


}