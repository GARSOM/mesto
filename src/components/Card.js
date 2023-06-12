export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike }, templateSelector, userId) {
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleSetLike = handleSetLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleDeleteClick = handleDeleteClick;

        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
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
        this._elementCard.src = this._link;
        this._elementCard.alt = this._name;
        this._element.querySelector('.photo__text').textContent = this._name;
        this._deleteButton = this._element.querySelector('.photo__basket');
        this._buttonLike = this._element.querySelector('.photo__like-button');
        this._likeCounter = this._element.querySelector('.photo__counter-likes')
        this._likeCounter.textContent = this._likes.length;

        if (this._ownerId !== this._userId) {
            this._deleteButton.remove();
        }
        this._checkLikedState();
        this._setEventListeners()
        return this._element;
    }

    deleteCard = () => {
        if (this._element) {
            this._element.remove();
            this._element = null;
        }
    }
    handleLike(data) {
        this._likes = data.likes;
        this._likeCounter.textContent = this._likes.length;
        this._buttonLike.classList.toggle('photo__like-active')
    }
    _checkLikedState() {
        this._data.likes.forEach((like) => {
            if (like._Id === this._userId) {
                this._buttonLike.classList.add('photo__like-active')
            }
        })
    }
    getId() {
        return this._cardId
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick()
        });

        this._elementCard.addEventListener('click', () =>
            this._handleCardClick(this._name, this._link,))


        this._buttonLike.addEventListener('click', () => {
            if (this._buttonLike.classList.contains('photo__like-active')) {
                this._handleDeleteLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        });
    }

}