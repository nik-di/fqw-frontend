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
    const [dependentPopupCallback = null, dependentFormCallback = null] = dependences;

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

    this.dependentPopupCallback = dependentPopupCallback;
    this.dependentFormInstance = this.formInpopup && dependentFormCallback && dependentFormCallback(this.formInpopup);
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
    if ((event.target === this.popupLink) && this.dependentPopupCallback) {
      this.close();
      const anotherPopup = this.dependentPopupCallback();
      anotherPopup.open();
      return;
    }
  }

  _deactivateDependentForm(form) {
    if (!this.dependentFormInstance) return;
    this.dependentFormInstance.stop();
  }

  _activateDependentForm() {
    if (!this.dependentFormInstance) return;
    this.dependentFormInstance.start();
  }

  _handlers() {
    const handlersArr = [
      [this.container, 'mousedown', this._handleCloseClickEvent],
      [this.container, 'keydown', this._handleEscapeKeydown],
      [this.container, 'click', this._handleLinkToAnotherPopup]
    ];
    return handlersArr;
  }

  open() {
    this._setPopupAnimation();
    this._setContent();
    this._activateDependentForm();
    this.container.classList.add(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._setEventListeners(this._handlers());
  }

  close() {
    this._deactivateDependentForm();
    this._clearPopupAnimation();
    this._clearContent();
    this.container.classList.remove(this.containerVisibleModifier);
    this._toggleBodyScroll();
    this._removeEventListeners(this._handlers());
  }
}
