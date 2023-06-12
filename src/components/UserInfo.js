export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._userName = nameSelector;
    this._userDescription = descriptionSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this._avatarSelector.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._avatarSelector.src = avatar;
  }
}  