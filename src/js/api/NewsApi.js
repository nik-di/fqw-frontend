export default class NewsApi {
  constructor(baseUrl, token) {
    this.url = baseUrl;
    this.token = token;
  }


  getNews(request, stringRequestOptions) {

    return fetch(`${this.url}?apiKey=${this.token}&q=${request}${stringRequestOptions}`)

      .then(this._getPromiseRes)

  }

  _getPromiseRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }
}
