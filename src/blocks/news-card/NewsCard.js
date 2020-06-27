import './news-card.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(article, cardOptions) {
    super();
    this.article = article;
    this.cardOptions = cardOptions;
    this.card = document.createElement('a');
  }

  getCard() {
    const { isLogged, cardType } = this.cardOptions;
    if (cardType === 'saved') {
      this.card.href = this.article.link;
      this.card.setAttribute('data-card-id', this.article._id);
      this.card.insertAdjacentHTML('beforeend', this._getSavedCardTemplate(this.article));
    } else {
      this.card.href = this.article.url;
      this.card.insertAdjacentHTML('beforeend', this._getFoundedCardTemplate(this.article));
    }
    console.log(this.card.querySelector('input').checked)
    this.card.classList.add('news-card');
    (isLogged && cardType === 'founded') ?
      null :
      this._setEventListeners(this._handlers());
    return this.card;
  }

  _correctDateForCardFormat(date) {
    const [year, month, dateNum] = date && date.split('T')[0].split('-');
    const monthArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const monthInIndex = (+month - 1);
    const correctedDate = `${dateNum} ${monthArr[monthInIndex]}, ${year}`;
    return correctedDate;
  }

  _setHint(isLogged) {
    const hintForFoundedCard = `<div class="news-card__article-btn-hint news-card__article-btn-hint_size_l">
    <p class="news-card__article-btn-hint-msg">Войдите, чтобы сохранять статьи</p>
  </div>`;
    const hintForDeleteCard = `<div class="news-card__article-btn-hint news-card__article-btn-hint_size_m">
  <p class="news-card__article-btn-hint-msg">Убрать из сохраненных</p>
</div>`;
    if (this.cardOptions.cardType === 'founded') {
      return isLogged ? '' : hintForFoundedCard;
    };
    if (this.cardOptions.cardType === 'saved') {
      return hintForDeleteCard;
    };
  }

  _getFoundedCardTemplate(articleContent) {
    const defaultImage = 'https://og-image.now.sh/Изображение%20отсутствует.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg';
    const {
      source,
      urlToImage,
      publishedAt,
      title,
      description
    } = articleContent;
    return (
      `<picture>
      <img src="${urlToImage ? urlToImage : defaultImage}" alt="Новостная картинка"
           class="news-card__img">
    </picture>
    <p class="news-card__date">${this._correctDateForCardFormat(publishedAt)}</p>
    <h3 class="news-card__title">${title}</h3>
    <p class="news-card__text">${description}</p>
    <p class="news-card__source-link">${source.name}</p>
    <label class="news-card__article-btn">
    <input type="checkbox">
    <span class="news-card__article-btn-mark-icon"></span>
  </label>`);
  }

  _getSavedCardTemplate(articleContent) {
    const {
      keyword, title, text, date, source, image,
    } = articleContent;
    return (
      `<picture>
      <img src="${image}" alt="Новостная картинка"
           class="news-card__img">
    </picture>
    <p class="news-card__date">${date}</p>
    <h3 class="news-card__title">${title}</h3>
    <p class="news-card__text">${text}</p>
    <p class="news-card__source-link">${source}</p>
    <div class="news-card__article-btn">
    <div class="news-card__article-btn-del">
    </div>
  </div>
  <div class="news-card__article-keyword">${keyword}
    </div>`);
  }

  _showHint() {
    this.card.insertAdjacentHTML('beforeend', this._setHint(this.cardOptions.isLogged));
  }

  _hideHint() {
    const hint = this.card.querySelector('.news-card__article-btn-hint');
    setTimeout(() => hint.remove(), 100);
  }

  _handlers() {
    const cardBtnForHint = this.card.querySelector('.news-card__article-btn');
    const showHint = this._showHint.bind(this);
    const hideHint = this._hideHint.bind(this);
    const handlersArr = [
      [cardBtnForHint, 'mouseover', showHint],
      [cardBtnForHint, 'mouseout', hideHint]
    ];
    return handlersArr;
  }
}
