export default class HeaderContent {
  constructor(headerContent, userName) {
    this.headerContent = headerContent;
    this.userName = userName;
  }

  renderArticlesHeader(articleQuantity, keywordArr) {
    const userName = this.headerContent.querySelector('.saved-articles__span-name');
    userName.textContent = this.userName;
    const cardQuantity = this.headerContent.querySelector('.saved-articles__span-articles-counter');
    cardQuantity.textContent = articleQuantity;
    const keywordSpan = this.headerContent.querySelector('.saved-articles__span-keyword-articles');
    const wordsWithTag = this._sortByQuantity(this._reduceKeywords(keywordArr));
    const preparedWords = wordsWithTag
      .map(wordTag => wordTag.slice(0, 1))
      .map(([word]) => word[0].toUpperCase() + word.slice(1));
    this._renderKeywordsQuantity(preparedWords, keywordSpan);
  }

  _renderKeywordsQuantity(wordsArr, elemFromDOM) {
    const [first, second, ...others] = wordsArr;
    if (!first) return;

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

  _sortByQuantity(reducedArr) {
    return reducedArr.sort((a, b) => {
      return b[1] - a[1];
    });
  }
}