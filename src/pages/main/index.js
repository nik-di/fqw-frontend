import './index.css';
import {
  MOBILE_MENU_BUTTON,
  PAGE_BODY,
  PAGE_OVERFLOW_MODIFIER,
  MOBILE_MENU_WRAPPER_ANIMATION,
  POPUP_VISIBLE_MODIFIER,
  MOBILE_MENU_POPUP_CLASSNAME,
  POPUP_CONTAINER,
  HEADER_TOP_PANEL_AUTH_BTN,
  POPUP_CLOSE_CLASSNAME,
  LINK_TO_ANOTHER_POPUP_CLASSNAME,
  MAIN_SECTION_CLASSNAME,
} from '../../js/constants/DOM-constants';
import { isDesktop } from '../../js/utils/isDesktop';
import Popup from '../../blocks/popup/Popup';
import Header from '../../blocks/header/Header';

localStorage.setItem('isLoggedIn', false);
localStorage.setItem('userName', 'Dimon');

// Header
const headerHandler = () => {
  const headerProps = {
    headerTextColor: 'white',
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
    userName: localStorage.getItem('userName'),
    linkToHiddenClassname: 'header-top-panel__link-to-saved-page',
    headerNavClassname: 'header-top-panel__nav'
  };
  const headerNav = isDesktop ? document.querySelector('.header-top-panel__nav') : document.querySelector('.popup__mobile-menu-nav');
  const headerInstance = new Header(headerNav, headerProps);
  headerInstance.render();
};

isDesktop && headerHandler();

const authPopupHandler = (ev) => {
  const isHeaderButton = ev.target === HEADER_TOP_PANEL_AUTH_BTN;
  const isAuthButton = !!HEADER_TOP_PANEL_AUTH_BTN.attributes['data-is-logged'].value === true;
  if (isHeaderButton && isAuthButton) {
    authPopup.open();
  }
};

const regPopupOpenHandler = () => {
  registrationPopup.open();
};

const authPopupOpenHandler = () => {
  authPopup.open();
};

const callRegSuccesPopupOpen = () => {
  regSuccessPopup.open();
};

const MOBILE_MENU_POPUP_TEMPLATE = document.querySelector(`.${MOBILE_MENU_POPUP_CLASSNAME}`).cloneNode(true).content,
  AUTH_POPUP_TEMPLATE = document.querySelector('.auth-popup').cloneNode(true).content,
  REGISTRATION_POPUP_TEMPLATE = document.querySelector('.registration-popup').cloneNode(true).content,
  REG_SUCCESS_POPUP_TEMPLATE = document.querySelector('.reg-success-popup').cloneNode(true).content;

const popupsOptions = {
  bodySelector: PAGE_BODY,
  hideBodyScrollClassname: PAGE_OVERFLOW_MODIFIER,
  containerVisibleModifier: POPUP_VISIBLE_MODIFIER,
  popupContainer: POPUP_CONTAINER,
  popupAnimation: MOBILE_MENU_WRAPPER_ANIMATION,
  popupCloseBtnClassname: POPUP_CLOSE_CLASSNAME,
  linkToAnotherPopupClassname: LINK_TO_ANOTHER_POPUP_CLASSNAME,
  mainSectionClassname: MAIN_SECTION_CLASSNAME
};

const registrationPopup = new Popup(REGISTRATION_POPUP_TEMPLATE, popupsOptions, authPopupOpenHandler);
const authPopup = new Popup(AUTH_POPUP_TEMPLATE, popupsOptions, regPopupOpenHandler);
const regSuccessPopup = new Popup(REG_SUCCESS_POPUP_TEMPLATE, popupsOptions, authPopupOpenHandler);

document.addEventListener('click', authPopupHandler);

/**
 * Mobile interactivity
 */
const mobileMenuPopup = new Popup(MOBILE_MENU_POPUP_TEMPLATE, popupsOptions, authPopupOpenHandler);
const mobileMenuHandler = (ev) => {
  if (ev.target === MOBILE_MENU_BUTTON ||
    ev.target.parentNode === MOBILE_MENU_BUTTON ||
    !!ev.target.closest('.mobile-menu-btn')) {
    mobileMenuPopup.open();
    headerHandler();
    return;
  }
};

!isDesktop && document.addEventListener('click', mobileMenuHandler);
