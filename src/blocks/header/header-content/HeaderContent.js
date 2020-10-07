export default class HeaderContent {
  constructor(headerContent, userName) {
    this.headerContent = headerContent;
    this.userName = userName;
    this.userNameElement = this.headerContent.querySelector('.saved-articles__span-name');
    this.articlesQuantityElement = this.headerContent.querySelector('.saved-articles__span-articles-counter');
    this.keywordSpanElement = this.headerContent.querySelector('.saved-articles__span-keyword-articles');

    this.articleQuantity = 0;
    this.keywordsArr = [];

    this.updateHeaderInfo = this.updateHeaderInfo.bind(this);
    this.removeArticleMention = this.removeArticleMention.bind(this);
  }

  removeArticleMention(articleKeyword) {
    this.articleQuantity -= 1;
    const indexForRemoving = this.keywordsArr.indexOf(articleKeyword);
    this.keywordsArr.splice(indexForRemoving, 1);
    this._updateArticlesStat();
  }

  _updateArticlesStat() {
    this.articlesQuantityElement.textContent = this.articleQuantity;
    const preparedWordsArr = this._prepareWords()
    this._renderKeywordsQuantity(preparedWordsArr, this.keywordSpanElement);
  }

  updateHeaderInfo(articleQuantity = 0, keywordsArr) {
    this.articleQuantity = articleQuantity;
    this.keywordsArr = keywordsArr;

    this.userNameElement.textContent = this.userName;
    this._updateArticlesStat();
  }

  _prepareWords() {
    const wordsWithTag = this._sortByQuantityKey(this._reduceKeywords(this.keywordsArr));
    const preparedWords = wordsWithTag
      .map(wordTag => wordTag.slice(0, 1))
      .map(([word]) => word[0].toUpperCase() + word.slice(1));
    return preparedWords;
  }

  _renderKeywordsQuantity(wordsArr, elemFromDOM) {
    const [first, second, ...others] = wordsArr;
    if (!first) {
      elemFromDOM.textContent = 'Нет ключевых слов';
      return;
    };

    switch (true) {
      case others.length === 1:
        elemFromDOM.textContent = `${first}, ${second} и ${others}`;
        break;
      case others.length > 1:
        elemFromDOM.textContent = `${first}, ${second} и ${others.length} другим`;
        break;
      case (second && !others.length):
        elemFromDOM.textContent = `${first} и ${second}`;
        break;
      default:
        elemFromDOM.textContent = first;
        break;
    }
  }

  _reduceKeywords(arr) {
    if (!arr.length) return [];
    return arr.reduce((acc, word, i, arr) => {
      acc.hash[word] = (acc.hash[word] || 0) + 1;
      if (i === arr.length - 1) {
        const keys = Object.keys(acc.hash);
        keys.forEach(key => {
          acc.arr.push([...[key], acc.hash[key]]);
        });
        return acc.arr;
      }
      return acc;
    }, {
      arr: [],
      hash: {}
    });
  }

  _sortByQuantityKey(reducedArr) {
    if (!reducedArr.length) return [];
    return reducedArr.sort((a, b) => {
      return b[1] - a[1];
    });
  }
}