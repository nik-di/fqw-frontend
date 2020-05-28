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
import Popup from '../../blocks/popup/Popup';

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

const callRegPopupOpen = () => {
    registrationPopup.open();
};

const callAuthPopupOpen = () => {
    authPopup.open();
};

const callRegSuccesPopupOpen = () => {
    regSuccessPopup.open();
};

const registrationPopup = new Popup(REGISTRATION_POPUP_TEMPLATE, popupsOptions, callAuthPopupOpen);
const authPopup = new Popup(AUTH_POPUP_TEMPLATE, popupsOptions, callRegPopupOpen);
const regSuccessPopup = new Popup(REG_SUCCESS_POPUP_TEMPLATE, popupsOptions, callAuthPopupOpen);
const mobileMenuPopup = new Popup(MOBILE_MENU_POPUP_TEMPLATE, popupsOptions, callAuthPopupOpen);

const mobileMenuHandler = (ev) => {
    if (ev.target === MOBILE_MENU_BUTTON || 
        ev.target.parentNode === MOBILE_MENU_BUTTON || 
        !!ev.target.closest('.mobile-menu-btn')) {
        mobileMenuPopup.open();
        return;
    }
};

const authPopupHandler = (ev) => {
    if (ev.target === HEADER_TOP_PANEL_AUTH_BTN) {
        authPopup.open(ev);
    }
};

// Event listeners
document.addEventListener('click', mobileMenuHandler);
document.addEventListener('click', authPopupHandler);
