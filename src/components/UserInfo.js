export class UserInfo {

  _userID

  constructor({ userNameElement, userBioElement, userAvatarElement }) {
    this._userName = userNameElement;
    this._userBio = userBioElement;
    this._userAvatarElement = userAvatarElement;

    this._userNameElement = document.querySelector(this._userName);
    this._userBioElement = document.querySelector(this._userBio);
    this._userAvatarElement = document.querySelector(this._userAvatarElement);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userBio: this._userBioElement.textContent,
      userAvatar: this._userAvatarElement.src,

    };
  }
  setUserInfo( username, userbio, userAvatar, userID ) {
    this._userNameElement.textContent = username;
    this._userBioElement.textContent = userbio;
    this._userAvatarElement.src = userAvatar;
    this._userID = userID;
  }
}
