export class UserInfo {
  constructor({ userNameElement, userBioElement }) {
    this._userName = userNameElement;
    this._userBio = userBioElement;

    this._userNameElement = document.querySelector(this._userName);
    this._userBioElement = document.querySelector(this._userBio);
  }

  getUserInfo() {
    // console.log({
    //   userName: this._userNameElement.textContent,
    //   userBio: this._userBioElement.textContent,
    // });
    return {
      userName: this._userNameElement.textContent,
      userBio: this._userBioElement.textContent,
    };
  }
  setUserInfo(userData) {
    console.log(userData);
    const profile = document.querySelector('.profile');
    const profileUserName = profile.querySelector('.profile__username');
    const profileUserBio = profile.querySelector('.profile__userbio');

    profileUserName.textContent = userData.username;
    profileUserBio.textContent = userData.userbio;
    // console.log('прием-прием ', userName);
    // console.log('прием-прием ', userBio);
  }
}
