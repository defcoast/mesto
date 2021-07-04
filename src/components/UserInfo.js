export class UserInfo {
  constructor({ userNameElement, userBioElement }) {
    this._userName = userNameElement;
    this._userBio = userBioElement;

    this._userNameElement = document.querySelector(this._userName);
    this._userBioElement = document.querySelector(this._userBio);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userBio: this._userBioElement.textContent,
    };
  }
  setUserInfo({ username, userbio }) {

    this._userNameElement.textContent = username;
    this._userBioElement.textContent = userbio;
  }
}
