import './index.css';
import {
    MOBILE_MENU_BUTTON,
    PAGE_BODY,
    PAGE_OVERFLOW_MODIFIER,
    MOBILE_MENU_WRAPPER_ANIMATION,
    POPUP_VISIBLE_MODIFIER,
    MOBILE_MENU_POPUP_CLASSNAME,
    POPUP_CONTAINER,
    POPUP_CLOSE_CLASSNAME,
    LINK_TO_ANOTHER_POPUP_CLASSNAME,
    MAIN_SECTION_CLASSNAME,
} from '../../js/constants/DOM-constants';
import Popup from '../../blocks/popup/Popup';

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

const MOBILE_MENU_POPUP_TEMPLATE = document.querySelector(`.${MOBILE_MENU_POPUP_CLASSNAME}`).content.cloneNode(true);
const mobileMenuPopup = new Popup(MOBILE_MENU_POPUP_TEMPLATE, popupsOptions);

const mobileMenuHandler = (ev) => {
    if (ev.target === MOBILE_MENU_BUTTON || 
        ev.target.parentNode === MOBILE_MENU_BUTTON || 
        !!ev.target.closest('.mobile-menu-btn')) {
        mobileMenuPopup.open();
        return;
    }
};

// Event listeners
document.addEventListener('click', mobileMenuHandler);