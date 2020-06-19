import './popup.css';
import BaseComponent from "../../js/components/BaseComponent";

export default class Popup extends BaseComponent {
  constructor(popupTemplate, popupOptions, ...dependences) {
    super();

    this.popupTemplate = popupTemplate;
    const {
      bodySelector,
      hideBodyScrollClassname,
      containerVisibleModifier,
      popupContainer,
      popupAnimation,
      popupCloseBtnClassname,
      linkToAnotherPopupClassname,
      mainSectionClassname
    } = popupOptions;
    const [dependentPopup = null, formCallback = null] = dependences;

    this.popupAnimation = popupAnimation;
    this.container = popupContainer;
    this.bodyOfPage = bodySelector;
    this.hideBodyScrollClassname = hideBodyScrollClassname;
    this.containerVisibleModifier = containerVisibleModifier;
    this.mainSection = document.querySelector(`.${mainSectionClassname}`);

    this.templateInDiv = document.createElement('div');
    this.templateInDiv.appendChild(this.popupTemplate);
    this.popupCloseBtn = this.templateInDiv.querySelector(`.${popupCloseBtnClassname}`);
    this.popupLink = this.templateInDiv.querySelector(`.${linkToAnotherPopupClassname}`);
    this.formInpopup = this.templateInDiv.querySelector('form');

    this._handleCloseClickEvent = this._handleCloseClickEvent.bind(this);
    this._handleEscapeKeydown = this._handleEscapeKeydown.bind(this);
    this._handleLinkToAnotherPopup = this._handleLinkToAnotherPopup.bind(this);

    this.callDependetPopup = dependentPopup;
    this.formCallback = formCallback;
  }

  _setContent() {
    this.container.appendChild(this.templateInDiv)
    this.mainSection.appendChild(this.container);
  }

  _clearContent() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.container.remove();
  }

  _toggleBodyScroll() {
    this.bodyOfPage.classList.toggle(this.hideBodyScrollClassname);
  }

  _setPopupAnimation() {
    this.container.style.animation = this.popupAnimation;
  }

  _clearPopupAnimation() {
    this.container.removeAttribute('style');
  }

  _handleCloseClickEvent(event) {
    if (event.target === this.container ||
      event.target === this.popupCloseBtn || event.target.parentElement === this.popupCloseBtn) {
      this.close();
      return;
    }
  }

  _handleEscapeKeydown(event) {
    const ESCAPE_KEYCODE = 27;
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.close();
      return;
    }
  }

  _handleLinkToAnotherPopup(event) {
    if (event.target === this.popupLink && this.callDependetPopup) {
      this.close();
      this.callDependetPopup();
      return;
    }
  }

  _deactivateDependetForm() {
    this.formCallback && this.formCallback(this.formInpopup).stop();
  }

  _activateDependetForm() {
    this.formCallback && this.formCallback(this.formInpopup).start();
  }

  _handlers() {
    const handlersArr = [
      [document, 'mousedown', this._handleCloseClickEvent],
      [document, 'keydown', this._handleEscapeKeydown],
      [document, 'click', this._handleLinkToAnotherPopup]
    ];
    return handlersArr;
  }

  open() {
    !!this.formInpopup && this._activateDependetForm();
    this._setPopupAnimation();
    this._setContent();
    this.container.classList.add(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._setEventListeners(this._handlers());
  }

  close() {
    !!this.formInpopup && this._deactivateDependetForm();
    this._clearPopupAnimation();
    this._clearContent();
    this.container.classList.remove(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._removeEventListeners(this._handlers());
  }
}
