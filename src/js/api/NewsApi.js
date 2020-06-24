export default class NewsApi {
  constructor(baseUrl, token) {
    this.url = baseUrl;
    this.token = token;
  }


  getNews({ q }, { pageSize, from, to }) {

    return fetch(`${this.url}?q=${q}&from=${from}&to=${to}&pageSize=${pageSize}`, {
      headers: {
        'x-api-key': this.token
      }
    })

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
