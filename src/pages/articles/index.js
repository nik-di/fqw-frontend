import './index.css';
import {
  MOBILE_MENU_BUTTON,
  PAGE_BODY,
  PAGE_OVERFLOW_MODIFIER,
  MOBILE_MENU_WRAPPER_ANIMATION,
  POPUP_VISIBLE_MODIFIER,
  POPUP_CONTAINER,
  POPUP_CLOSE_CLASSNAME,
  LINK_TO_ANOTHER_POPUP_CLASSNAME,
  MAIN_SECTION_CLASSNAME,
  CARD_LIST_CONTAINER,
  CARD_LIST
} from '../../js/constants/DOM-constants';
import { NEWS_EXPLORER_BASE_URL } from '../../js/constants/constants';
import { isDesktop } from '../../js/utils/isDesktop';
import Popup from '../../blocks/popup/Popup';
import Header from '../../blocks/header/Header';
import NewsExplorerApi from '../../js/api/NewsExplorerApi';
import NewsCard from '../../blocks/news-card/NewsCard';
import NewsCardList from '../../blocks/news-card-list/NewsCardList';
import HeaderContent from '../../blocks/header/header-content/HeaderContent';

const newsExplorerApi = new NewsExplorerApi(NEWS_EXPLORER_BASE_URL);
newsExplorerApi.getUserData().catch(() => {
  window.stop();
  const { origin } = document.location;
  document.location.href = `${origin}/main.html`;
});

/**
 * HeaderContent logic ↓
 */
const headerContent = new HeaderContent(document.querySelector('.header-content'), JSON.parse(localStorage.getItem('User')).name);
// HeaderContent logic end

/**
 * NewsCardList logic ↓
 */
const callbackCardConstructor = (article) => {
  return new NewsCard(article, {
    cardType: 'saved',
    isLogged: JSON.parse(localStorage.getItem('isLoggedIn')),
    keyword: JSON.parse(localStorage.getItem('NewsResult')).keyword,
    api: newsExplorerApi
  });
};
const newsCardList = new NewsCardList(CARD_LIST, CARD_LIST_CONTAINER, callbackCardConstructor);
newsExplorerApi
  .getArticles()
  .then(articles => {
    if (!articles.length) return;
    newsCardList.showCardListBlock();
    newsCardList.renderAllCards(articles);
    const keywordsArr = [...document.querySelectorAll('.news-card__article-keyword')].map(keywordElem => keywordElem.textContent);
    headerContent.renderArticlesHeader(articles.length, keywordsArr);
  })
  .catch()
// NewsCardList logic end

/**
 * Header logic ↓
 */
const headerHandler = () => {
  const headerProps = {
    isMainPage: false,
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
    userName: JSON.parse(localStorage.getItem('User')) && JSON.parse(localStorage.getItem('User')).name
  };
  const headerNav = isDesktop ? document.querySelector('.header-top-panel__nav') : document.querySelector('.popup__mobile-menu-nav');
  const headerInstance = new Header(headerNav, headerProps);
  headerInstance.render();
};

isDesktop && headerHandler();
// Header logic end

/**
 * Mobile interactivity ↓
 */
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
const MOBILE_MENU_POPUP_TEMPLATE = document.querySelector('.mobile-menu-popup').cloneNode(true).content;
const mobileMenuPopup = new Popup(MOBILE_MENU_POPUP_TEMPLATE, popupsOptions);
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
