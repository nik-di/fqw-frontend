import BaseComponent from "../../js/components/BaseComponent";

export default class Popup extends BaseComponent {
  constructor(popupTemplate, popupOptions, dependentPopupCallback) {
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

    this._handleCloseClickEvent = this._handleCloseClickEvent.bind(this);
    this._handleEscapeKeydown = this._handleEscapeKeydown.bind(this);
    this._handleLinkToAnotherPopup = this._handleLinkToAnotherPopup.bind(this);

    this.dependetPopupCallback = dependentPopupCallback;
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
    if (event.target === this.popupLink) {
      this.close();
      this.dependetPopupCallback();
      return;
    }
  }

  _handlers() {
    const handlersArr = [
      [document, 'click', this._handleCloseClickEvent],
      [document, 'keydown', this._handleEscapeKeydown],
      [document, 'click', this._handleLinkToAnotherPopup]
    ];
    return handlersArr;
  }

  open() {
    this._setPopupAnimation();
    this._setContent();
    this.container.classList.add(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._setEventListeners(this._handlers());
  }

  close() {
    this._clearPopupAnimation();
    this._clearContent();
    this.container.classList.remove(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._removeEventListeners(this._handlers());
  }
}
