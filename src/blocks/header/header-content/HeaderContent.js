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
    const keywords = [...new Set(keywordArr.map(word => word.toLowerCase()))];
    switch (keywords.length) {
      case 1:
        keywordSpan.textContent = keywords.map(word => word[0].toUpperCase() + word.slice(1));
        break;
      case 2:
      case 3:
        keywordSpan.textContent = keywords.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        break;
      default:
        const reducedObj = this._reduceKeywords(keywordArr);
        const [first, second, ...oth] = this._sortByQuantity(reducedObj).map(el => Object.keys(el));
        keywordSpan.textContent = `${first}, ${second} и ${oth.length} другим`;
        break;
    }
  }

  _reduceKeywords(arr) {
    return arr.reduce((acc, cur) => {
      if (!acc.hash[cur]) {
        acc.hash[cur] = { [cur]: 1 };
        acc.map.set(acc.hash[cur], 1);
        acc.result.push(acc.hash[cur]);
      } else {
        acc.hash[cur][cur] += 1;
        acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
      }
      return acc;
    }, {
      hash: {},
      map: new Map(),
      result: []
    });
  }

  _sortByQuantity(reducedArr) {
    return reducedArr.result.sort((a, b) => {
      return reducedArr.map.get(b) - reducedArr.map.get(a);
    });
  }
}