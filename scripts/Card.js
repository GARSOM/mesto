class Card {
    constructor(data, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
    }
    _getCardTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.photo__white')
            .cloneNode(true);
        return cardElement;
    }
    getCard() {
        this._element = this._getCardTemplate();
        this._elementCard = this._element.querySelector('.photo__element');
        this._elementCard.src = this._data.link;
        this._elementCard.alt = this._data.name;
        this._element.querySelector('.photo__text').textContent = this._data.name;
        this._deleteButton = this._element.querySelector('.photo__basket');
        this._buttonLike = this._element.querySelector('.photo__like-button');
        this._setEventListeners()
        return this._element;
    }
    _setEventListeners() {
        this._deleteButton.addEventListener('click', this._handeleDelete);
        this._buttonLike.addEventListener('click', this._handeleLike);
        this._elementCard.addEventListener('click', this._showPopupWithImage);
    }

    _handeleDelete = () => {
        this._element.remove();
    }

    _handeleLike = () => {
        this._buttonLike.classList.toggle('photo__like-active');
    }

    _showPopupWithImage = () => {
        openPopup(imageShowPopup);
        imageShowImg.src = this._elementCard.src;
        imageShowImg.alt = this._elementCard.alt;
        imageShowCaption.textContent = this._elementCard.alt;
    }
}

export default Card;
import { openPopup, imageShowPopup, imageShowCaption, imageShowImg } from "./index.js";
