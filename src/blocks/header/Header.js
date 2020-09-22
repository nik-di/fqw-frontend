import './header.css';

export default class Header {
  constructor(headerNavigation, props) {
    const {
      isMainPage,
      isLoggedIn,
      userName
    } = props;

    this.isMainPage = isMainPage;
    this.isLogged = isLoggedIn;
    this.userName = userName;
    this.headerNav = headerNavigation;
    this.headerButton = this.headerNav.querySelector('.header-top-panel__button');
    this.linkForHidden = this.headerNav.querySelector('.header-top-panel__link-to-saved-page');
    this.dataIsLoggedBtnAttr = this.headerButton.attributes['data-is-logged'];
  }

  _renderBtnContent() {
    const initialBtnValue = 'Авторизоваться';
    if (this.isLogged) {
      const logoutIconTemplate = this.headerNav.querySelector('#logout-icon-tpl').content;
      const serviceDiv = document.createElement('div');
      serviceDiv.append(logoutIconTemplate);
      this.headerButton.textContent = this.userName;
      this.headerButton.insertAdjacentHTML('beforeend', serviceDiv.innerHTML);
      return;
    }
    if (!this.isLogged) {
      this.headerButton.innerHTML = initialBtnValue;
    }
  }

  _linkHidden() {
    if (!this.isLogged) {
      const link = this.linkForHidden;
      link.classList.add('header-top-panel__link_hidden');
    };
  }

  _linkShow() {
    if (this.isLogged) {
      const link = this.linkForHidden;
      link.classList.remove('header-top-panel__link_hidden');
    };
  }

  _changeRoleHeaderButton() {
    this.isLogged ?
      this.dataIsLoggedBtnAttr.value = 'logged' :
      this.dataIsLoggedBtnAttr.value = 'unlogged';
  }

  render() {
    this._renderBtnContent();
    if (this.isMainPage) {
      this._linkHidden();
      this._linkShow();
    }
    this._changeRoleHeaderButton();
  }
}