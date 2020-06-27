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

  renderCards(articles) {
    if (this.articles.length) {
      this._removeEventListeners(this._handlers());
    }
    this.articles.push(...articles);
    const FIRST_THREE_ARTCILE_NUM = 3;
    const firstThreeArticles = this.articles.splice(0, FIRST_THREE_ARTCILE_NUM);
    firstThreeArticles.forEach(article => {
      this.cardsContainer.appendChild(this._getCard(article));
    });
    console.log(this._handlers()[1])
    if (this.isMainPage && this.articles.length) {
      this._showButtonControl();
      this._setEventListeners(this._handlers()[0]);
    }
  }

  _showMore(ev) {
    const button = this.cardList.querySelector('button');
    if (ev.target === button && this.articles.length) {
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
    const button = this.cardList.querySelector('button');
    button.removeAttribute('disabled');
  }

  _hideButton() {
    const button = this.cardList.querySelector('button');
    button.setAttribute('disabled', true);
  }

  _handlers() {
    const showMoreHandler = this._showMore.bind(this);
    const handlersArr = [
      [this.cardList, 'click', showMoreHandler]
    ];
    return handlersArr;
  }
};