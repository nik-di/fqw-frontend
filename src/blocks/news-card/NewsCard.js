import './news-card.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(article, cardOptions) {
    super();
    this.article = article;
    this.cardOptions = cardOptions;
    this.card = document.createElement('a');
  }

  _xssSanitizeData(elem) {
    const plug = document.createElement('div');
    plug.innerText = elem;
    return plug.innerHTML;
  }

  getCard() {
    const { isLogged, cardType } = this.cardOptions;
    this.card.classList.add('news-card');
    if (cardType === 'saved') {
      const { link, _id, keyword } = this.article;
      this.card.href = link;
      this.card.dataset.cardId = _id;
      this.card.dataset.cardKeyword = keyword;
      this.card.insertAdjacentHTML('beforeend', this._getSavedCardTemplate(this.article));
      this._setEventListeners([this._handlers()[3]]);
    } else {
      this.card.href = this.article.url;
      this.card.insertAdjacentHTML('beforeend', this._getFoundedCardTemplate(this.article));
      this._checkboxEnabled(isLogged);
      isLogged && this._setEventListeners([this._handlers()[2]]);
    }
    const [showHint, hideHint] = this._handlers();
    (isLogged && cardType === 'founded') ?
      null :
      this._setEventListeners([showHint, hideHint]);
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
      <img src="${this._xssSanitizeData(urlToImage ? urlToImage : defaultImage)}" alt="Новостная картинка"
           class="news-card__img">
    </picture>
    <p class="news-card__date">${this._xssSanitizeData(this._correctDateForCardFormat(publishedAt))}</p>
    <h3 class="news-card__title">${this._xssSanitizeData(title)}</h3>
    <p class="news-card__text">${this._xssSanitizeData(description)}</p>
    <p class="news-card__source-link">${this._xssSanitizeData(source.name)}</p>
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
      `<picture><img src="${this._xssSanitizeData(image)}" alt="Новостная картинка" class="news-card__img"></picture>
    <p class="news-card__date">${this._xssSanitizeData(date)}</p>
    <h3 class="news-card__title">${this._xssSanitizeData(title)}</h3>
    <p class="news-card__text">${this._xssSanitizeData(text)}</p>
    <p class="news-card__source-link">${this._xssSanitizeData(source)}</p>
    <label class="news-card__article-btn">
      <input type="checkbox">
      <span class="news-card__article-btn-del"></span>
    </label>
  </div>
  <div class="news-card__article-keyword">${this._xssSanitizeData(keyword)}</div>`);
  }

  _showHint() {
    this.card.insertAdjacentHTML('beforeend', this._setHint(this.cardOptions.isLogged));
  }

  _hideHint() {
    const hint = this.card.querySelector('.news-card__article-btn-hint');
    hint.remove();
  }

  _checkboxEnabled(isLogged) {
    const checkbox = this.card.querySelector('.news-card__article-btn input[type="checkbox"]');
    if (!isLogged) checkbox.setAttribute('disabled', '');
    else checkbox.removeAttribute('disabled');
  }

  _saveCard(ev) {
    const { api, keyword } = this.cardOptions;
    const checkbox = ev.target;
    const card = this.card;
    const date = card.querySelector('.news-card__date').textContent;
    const link = card.href;
    const image = card.querySelector('.news-card__img').src;
    const title = card.querySelector('.news-card__title').textContent;
    const text = card.querySelector('.news-card__text').textContent;
    const source = card.querySelector('.news-card__source-link').textContent;
    api
      .createArticle({ date, link, image, title, text, source, keyword })
      .then((res) => {
        checkbox.checked = true;
      })
      .catch((err) => {
        checkbox.checked = false;
        console.error('card-err', err)
      })
      .finally(() => {
        checkbox.setAttribute('disabled', '')
      });
  }

  _deleteCard() {
    const { cardId, cardKeyword } = this.card.dataset;
    const { api, removeArticleFromHeader } = this.cardOptions;
    api
      .removeArticle(cardId)
      .then(() => {
        const [showHint, hideHint, delCard] = this._handlers();
        this._removeEventListeners([showHint, hideHint, delCard]);
        this.card.remove();
        removeArticleFromHeader(cardKeyword);
      })
      .catch((err) => {
        alert('По каким-то причинам сюда попала не Ваша карточка и Вы не можете её удалить...')
        console.error('card-err', err);
      });
  }

  _handlers() {
    const cardBtnForHint = this.card.querySelector('.news-card__article-btn');
    const showHint = this._showHint.bind(this);
    const hideHint = this._hideHint.bind(this);
    const saveCard = this._saveCard.bind(this);
    const delCard = this._deleteCard.bind(this);
    const handlersArr = [
      [cardBtnForHint, 'mouseover', showHint],
      [cardBtnForHint, 'mouseout', hideHint],
      [cardBtnForHint, 'change', saveCard],
      [cardBtnForHint, 'mousedown', delCard]
    ];
    return handlersArr;
  }
}
