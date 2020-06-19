import './header.css';

export default class Header {
  constructor(headerNavigation, props) {
    const {
      headerTextColor,
      isLoggedIn,
      userName,
      mobileMenuBtn,
      linkToHiddenClassname
    } = props;

    this.textColor = headerTextColor;
    this.isLogged = isLoggedIn;
    this.userName = userName;
    this.mobileMenuBtn = mobileMenuBtn;
    this.headerNav = headerNavigation;
    this.headerButton = this.headerNav.querySelector('.header-top-panel__button');
    this.linkForHidden = this.headerNav.querySelector(`.${linkToHiddenClassname}`);
  }

  _renderName() {
    if (this.isLogged) {
      const button = this.headerButton;
      const logoutIcon = button.querySelector('.header-top-panel__btn-logout-icon');
      logoutIcon.classList.remove('header-top-panel__btn-logout-icon_hidden');
      button.textContent = this.userName;
      button.insertAdjacentElement('beforeend', logoutIcon);
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
    const dataIsLoggedBtnAttr = this.headerButton.attributes['data-is-logged'];
    this.isLogged ?
      dataIsLoggedBtnAttr.value = true :
      dataIsLoggedBtnAttr.value = false;
  }

  render() {
    this._renderName();
    this._linkHidden();
    this._linkShow();
    this._changeRoleHeaderButton();
  }
}