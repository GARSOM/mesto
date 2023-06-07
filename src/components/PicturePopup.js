import Popup from "./Popup.js";

export default class PicturePopup extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this._title = this._popup.querySelector('.popup__caption');
    this._image = this._popup.querySelector('.popup__img');
    this._alt = this._image;
  }

  open(name, link, alt) {
    super.open();
    this._title.textContent = name;
    this._image.src = link;
    this._alt.alt = alt;
  }
}