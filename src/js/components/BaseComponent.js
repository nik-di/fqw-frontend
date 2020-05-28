export default class BaseComponent {
  constructor() { }

  _setEventListeners(listeners) {
    listeners.forEach(
      ([element, eventName, handler]) => {
        element.addEventListener(eventName, handler);
      }
    );
  }

  _removeEventListeners(listeners) {
    listeners.forEach(
      ([element, eventName, handler]) => {
        element.removeEventListener(eventName, handler);
      }
    );
  }
}