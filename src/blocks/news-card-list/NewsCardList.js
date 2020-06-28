import './news-card-list.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(cardListDOM, cardsContainer, cardConstructor = null) {
    super();
    this.cardList = cardListDOM;
    this.cardsContainer = cardsContainer;
    this.cardAssembler = cardConstructor;
    this.articles = [];
    this.isMainPage = document.location.href.includes('main.html');
    this.showMoreButton = this.cardList.querySelector('button');
    this.showMoreHandler = this._showMore.bind(this);
  }

  showCardListBlock() {
    this.cardList.classList.add('news-card-list_visible');
  }

  hideCardListBlock() {
    this.cardList.classList.remove('news-card-list_visible');
  }

  _getCard(article) {
    const card = this.cardAssembler && this.cardAssembler(article).getCard();
    return card;
  }

  clearContainer() {
    if (this.cardsContainer.firstElementChild) {
      this._removeEventListeners(this._handlers());
      while (this.cardsContainer.firstElementChild) {
        this.cardsContainer.removeChild(this.cardsContainer.firstElementChild);
      }
    }
  }

  renderFirstCards(articles) {
    if (this.articles.length > 0) {
      this.articles.length = 0;
    };
    this.articles.push(...articles);
    const FIRST_THREE_ARTICLE_NUM = 3;
    const firstThreeArticles = this.articles.splice(0, FIRST_THREE_ARTICLE_NUM);
    firstThreeArticles.forEach(article => {
      this.cardsContainer.appendChild(this._getCard(article));
    });
    this._showButtonControl();
    if (this.articles.length > 0) {
      this._setEventListeners(this._handlers());
    }
  }

  renderAllCards(articles) {
    this.articles.push(...articles);
    this.articles.forEach(article => {
      this.cardsContainer.appendChild(this._getCard(article));
    });
  }

  _showMore(ev) {
    if (ev.target === this.showMoreButton && this.articles.length) {
      const FIRST_THREE_ARTICLE_NUM = 3;
      const threeArticles = this.articles.splice(0, FIRST_THREE_ARTICLE_NUM);
      threeArticles.forEach(article => {
        this.cardsContainer.appendChild(this._getCard(article));
      });
      this._showButtonControl();
    }
  }

  _showButtonControl() {
    if (this.articles.length === 0) {
      this._removeEventListeners(this._handlers());
      this._hideButton();
      return;
    }
    this._showButton();
  }

  _showButton() {
    this.showMoreButton.removeAttribute('disabled');
  }

  _hideButton() {
    this.showMoreButton.setAttribute('disabled', '');
  }

  _handlers() {
    const handlersArr = [
      [this.showMoreButton, 'click', this.showMoreHandler]
    ];
    return handlersArr;
  }
};