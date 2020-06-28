import './header.css';

export default class Header {
  constructor(headerNavigation, props) {
    const {
      isMainPage,
      isLoggedIn,
      userName,
      linkToHiddenClassname
    } = props;

    this.isMainPage = isMainPage;
    this.isLogged = isLoggedIn;
    this.userName = userName;
    this.headerNav = headerNavigation;
    this.headerButton = this.headerNav.querySelector('.header-top-panel__button');
    this.linkForHidden = this.headerNav.querySelector(`.${linkToHiddenClassname}`);
    this.dataIsLoggedBtnAttr = this.headerButton.attributes['data-is-logged'];
  }

  _renderName() {
    const initialBtnValue = 'Авторизоваться';
    if (this.isLogged) {
      this.headerButton.textContent = this.userName;
      return;
    }
    if (!this.isLogged) {
      this.headerButton.textContent = initialBtnValue;
    }
  }

  _renderLogoutIcon() {
    const logoutIcon = this.headerNav.querySelector('.header-top-panel__btn-logout-icon');
    if (this.isLogged) {
      logoutIcon.classList.remove('header-top-panel__btn-logout-icon_hidden');
    }
    if (!this.isLogged) {
      logoutIcon.classList.add('header-top-panel__btn-logout-icon_hidden');
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
    this._renderName();
    this._renderLogoutIcon();
    if (this.isMainPage) {
      this._linkHidden();
      this._linkShow();
    }
    this._changeRoleHeaderButton();
  }
}