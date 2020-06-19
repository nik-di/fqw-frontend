import './form.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Form extends BaseComponent {
  constructor(formElement) {
    super();
    this._validateForm = this._validateForm.bind(this);
    this._submitControl = this._submitControl.bind(this);
    this.form = formElement;
  }

  _checkInputsValidity() {
    const form = this.form;
    const inputs = form && [...form.querySelectorAll('input')];
    let checkResult = false;
    if (form) {
      const isAllInputValid = inputs.every((input) => {
        return input.validity.valid;
      });
      checkResult = isAllInputValid;
    }
    return checkResult;
  }

  _submitControl(event) {
    const isValid = this._checkInputsValidity();
    if (!isValid) {
      event.preventDefault();
      this._validateForm();
    }
  }

  _validateForm() {
    const form = this.form;
    const isValid = this._checkInputsValidity();
    const formButton = form.querySelector('button');
    const spanError = [...form.querySelectorAll('span.form__error')];
    if (isValid) {
      formButton.removeAttribute('disabled');
    } else {
      spanError.forEach((span) => {
        if (!span.previousElementSibling.validity.valid) {
          span.classList.add('form__error_active');
        }
      })
      formButton.setAttribute('disabled', true);
    }
  }

  _handlers() {
    const handlersArr = [
      [document, 'input', this._validateForm],
      [document, 'submit', this._submitControl]
    ];
    return handlersArr;
  }

  start() {
    this._setEventListeners(this._handlers());
  }

  stop() {
    this._removeEventListeners(this._handlers());
  }
}