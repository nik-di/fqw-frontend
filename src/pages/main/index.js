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
  CARD_LIST_CONTAINER,
  CARD_LIST
} from '../../js/constants/DOM-constants';
import { NEWS_API_BASE_URL, NEWS_API_KEY, NEWS_EXPLORER_BASE_URL, PRAKTIKUM_PROXY_SERVER } from '../../js/constants/constants';
import { isDesktop } from '../../js/utils/isDesktop';
import { dateCorrectorToSpecificDate } from '../../js/utils/dateCorrectorToSpecificDate';
import Popup from '../../blocks/popup/Popup';
import Form from '../../blocks/form/Form';
import Header from '../../blocks/header/Header';
import NewsExplorerApi from '../../js/api/NewsExplorerApi';
import NewsApi from '../../js/api/NewsApi';
import NewsCardList from '../../blocks/news-card-list/NewsCardList';

const newsApi = new NewsApi(NEWS_API_BASE_URL, NEWS_API_KEY);
const newsExplorerApi = new NewsExplorerApi(NEWS_EXPLORER_BASE_URL);

/**
 * NewsCardList logic ↓
 */
const callbackCardConstructor = (article) => `new NewsCard(${article})`;
const newsCardList = new NewsCardList(CARD_LIST, CARD_LIST_CONTAINER, callbackCardConstructor);
newsCardList.showCardListBlock();
// newsCardList.renderCards(JSON.parse(localStorage.getItem('newsApiArticles')));
// NewsCardList logic end

/**
 * Forms logic ↓
 */
const searchSubmit = (formInstance) => {
  const formValues = formInstance.getSubmitInfo();
  const newsOptions = {
    from: dateCorrectorToSpecificDate().toISOString(),
    to: new Date().toISOString(),
    pageSize: 100
  };
  newsApi
    .getNews(formValues, newsOptions)
    .then((res) => {
      localStorage.setItem('NewsResult', JSON.stringify(res));
    })
    .catch((err) => console.error('errrrrrrr', err))
};

const searchForm = new Form(document.querySelector('.search-form'), searchSubmit);
searchForm.start();

const signinSubmit = (formInstance) => {
  const formValues = formInstance.getSubmitInfo();
  newsExplorerApi
    .signin(formValues)
    .then((res) => {
      if (res.ok) {
        signinPopup.close();
      }
    })
    .then(() => {
      return newsExplorerApi.getUserData();
    })
    .then((res) => {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('User', JSON.stringify(res));
    })
    .then(() => {
      headerHandler();
    })
    .catch((err) => {
      formInstance.setServerError(err.message);
    })
};

const signupSubmit = (formInstance) => {
  const formValues = formInstance.getSubmitInfo();
  newsExplorerApi
    .signup(formValues)
    .then((res) => {
      callRegSuccesPopupOpen();
    })
    .catch((err) => {
      const { message } = err;
      if (message === Object(message)) {
        formInstance.setServerError(message[0]);
        return;
      }
      formInstance.setServerError(message);
    })
};

const signupFormClassCallback = (form) => new Form(form, signupSubmit);
const signinFormClassCallback = (form) => new Form(form, signinSubmit);
// Forms logic end

/**
 * Header logic ↓
 */
const headerHandler = () => {
  const headerProps = {
    headerTextColor: 'white',
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
    userName: JSON.parse(localStorage.getItem('User')) && JSON.parse(localStorage.getItem('User')).name,
    linkToHiddenClassname: 'header-top-panel__link-to-saved-page',
    headerNavClassname: 'header-top-panel__nav'
  };
  const headerNav = isDesktop ? document.querySelector('.header-top-panel__nav') : document.querySelector('.popup__mobile-menu-nav');
  const headerInstance = new Header(headerNav, headerProps);
  headerInstance.render();
};

isDesktop && headerHandler();
// Header logic end

/**
 * Popups logic ↓
 */
const signinPopupHandler = (ev) => {
  const isHeaderButton = ev.target === HEADER_TOP_PANEL_AUTH_BTN;
  const isAuthButton = HEADER_TOP_PANEL_AUTH_BTN.attributes['data-is-logged'].value === 'unlogged';
  if (isHeaderButton && isAuthButton) {
    signinPopup.open();
    return;
  }
  if (isHeaderButton && !isAuthButton) {
    newsExplorerApi.logout()
      .then(() => {
        localStorage.setItem('isLoggedIn', false);
      })
      .then(() => headerHandler())
      .catch((err) => console.error('errr', err))
  }
};

const signupPopupCallback = () => signupPopup;

const signinPopupCallback = () => signinPopup;

const callRegSuccesPopupOpen = () => {
  signinPopup.close();
  signupSuccessPopup.open()
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

const signupPopup = new Popup(REGISTRATION_POPUP_TEMPLATE, popupsOptions, signinPopupCallback, signupFormClassCallback);
const signinPopup = new Popup(AUTH_POPUP_TEMPLATE, popupsOptions, signupPopupCallback, signinFormClassCallback);
const signupSuccessPopup = new Popup(REG_SUCCESS_POPUP_TEMPLATE, popupsOptions, signinPopupCallback);

isDesktop && document.addEventListener('click', signinPopupHandler);
// Popups logic end

/**
 * Mobile interactivity ↓
 */
const mobileMenuPopup = new Popup(MOBILE_MENU_POPUP_TEMPLATE, popupsOptions, signinPopupCallback);
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
