class Card {
    constructor({ data, handleCardClick }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._setEventListeners()
        return this._element;
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', this._handeleDelete);
        this._buttonLike.addEventListener('click', this._handeleLike);
        this._elementCard.addEventListener('click', () =>
            this._handleCardClick(this._name, this._link,)
        );
    }

    _handeleDelete = () => {
        this._element.remove();
    }

    _handeleLike = () => {
        this._buttonLike.classList.toggle('photo__like-active');
    }
}

export default Card;