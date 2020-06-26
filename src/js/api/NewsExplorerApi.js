export default class NewsExplorerApi {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  getArticles() {

    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
    })

      .then(res => res.json())
  }

  createArticle(articleProps) {

    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...articleProps })
    })

      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const jsonResponse = await res.json()
          return Promise.reject(jsonResponse);
        }
      })
  }

  removeArticle(articleId) {
    return fetch(`${this.url}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include'
    })

      .then(async (res) => {
        if (res.ok) {
          return res;
        } else {
          const jsonResponse = await res.json()
          return Promise.reject(jsonResponse);
        }
      })
  }

  signup(userProps) {
    // return fetch(`${this.url}/signup`, {
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProps)
    })

      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const jsonResponse = await res.json()
          return await Promise.reject(jsonResponse);
        }
      })
  }

  signin(userProps) {
    // return fetch(`${this.url}/signin`, {
    return fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userProps)
    })

      .then(async (res) => {
        if (res.ok) {
          return res;
        } else {
          const jsonResponse = await res.json()
          return await Promise.reject(jsonResponse);
        }
      })
  }

  getUserData() {
    // return fetch(`${this.url}/users/me`, {
    return fetch('http://localhost:3000/users/me', {
      credentials: 'include',
      method: 'GET'
    })

      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const jsonResponse = await res.json()
          return Promise.reject(jsonResponse);
        }
      })
  }

  logout() {
    // return fetch(`${this.url}/users/me`, {
    return fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST'
    })

      .then(async (res) => {
        if (res.ok) {
          return res;
        } else {
          const jsonResponse = await res.json()
          return await Promise.reject(jsonResponse);
        }
      })
  }
}