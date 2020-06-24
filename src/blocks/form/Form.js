import './form.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Form extends BaseComponent {
  constructor(formElement, submitHandler) {
    super();
    this._validateForm = this._validateForm.bind(this);
    this._submitControl = this._submitControl.bind(this);
    this.form = formElement;
    this.submitHandler = submitHandler;
    this.serverErrorElement = this.form.querySelector('.form__server-error');
  }

  _checkInputsValidity(form = this.form) {
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
    event.preventDefault()
    const isValid = this._checkInputsValidity();
    if (!isValid) {
      this._validateForm();
      return;
    }
    this._removeServerError();
    this.submitHandler(this)
  }

  _validateForm() {
    const form = this.form;
    const isValid = this._checkInputsValidity(form);
    const formButton = form.querySelector('button');
    const formError = [...form.querySelectorAll('.form__error')];
    if (isValid) {
      formButton.removeAttribute('disabled');
    } else {
      formError.forEach((errorElem) => {
        if (!errorElem.previousElementSibling.validity.valid) {
          errorElem.classList.add('form__error_active');
        }
        if (errorElem.classList.contains('form__server-error')) return;
      })
      formButton.setAttribute('disabled', true);
    }
    this._removeServerError();
  }

  _handlers() {
    const handlersArr = [
      [this.form, 'input', this._validateForm],
      [this.form, 'submit', this._submitControl]
    ];
    return handlersArr;
  }

  _clear() {
    this.form.reset();
  }

  getSubmitInfo() {
    const inputs = this.form && [...this.form.querySelectorAll('input')];
    const inputsInfo = inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
    return inputsInfo;
  }

  setServerError(message) {
    if (!this.serverErrorElement) return;
    this.serverErrorElement.textContent = message;
    this.serverErrorElement.classList.add('form__server-error_visible');
  }

  _removeServerError() {
    if (!this.serverErrorElement) return;
    this.serverErrorElement.textContent = '';
    this.serverErrorElement.classList.remove('form__server-error_visible');
  }

  start() {
    this._setEventListeners(this._handlers());
  }

  stop() {
    this._clear();
    this._removeServerError();
    this._removeEventListeners(this._handlers());
  }
}