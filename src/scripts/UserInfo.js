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
    const profile = document.querySelector('.profile');
    const profileUserName = profile.querySelector('.profile__username');
    const profileUserBio = profile.querySelector('.profile__userbio');

    profileUserName.textContent = username;
    profileUserBio.textContent = userbio;
  }
}
